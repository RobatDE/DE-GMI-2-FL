const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TasksDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.create(
      {
        id: data.id || undefined,
        title: data.title || null,
        content: data.content || null,
        starttime: data.starttime || null,
        priority: data.priority || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tasks.setTeam_member(data.team_member || null, {
      transaction,
    });

    await tasks.setProject(data.project || null, {
      transaction,
    });

    await tasks.setOwner(data.owner || null, {
      transaction,
    });

    await tasks.setTask(data.task || null, {
      transaction,
    });

    return tasks;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const tasksData = data.map((item) => ({
      id: item.id || undefined,

      title: item.title || null,
      content: item.content || null,
      starttime: item.starttime || null,
      priority: item.priority || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const tasks = await db.tasks.bulkCreate(tasksData, { transaction });

    // For each item created, replace relation files

    return tasks;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findByPk(id, {
      transaction,
    });

    await tasks.update(
      {
        title: data.title || null,
        content: data.content || null,
        starttime: data.starttime || null,
        priority: data.priority || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await tasks.setTeam_member(data.team_member || null, {
      transaction,
    });

    await tasks.setProject(data.project || null, {
      transaction,
    });

    await tasks.setOwner(data.owner || null, {
      transaction,
    });

    await tasks.setTask(data.task || null, {
      transaction,
    });

    return tasks;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findByPk(id, options);

    await tasks.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await tasks.destroy({
      transaction,
    });

    return tasks;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const tasks = await db.tasks.findOne({ where }, { transaction });

    if (!tasks) {
      return tasks;
    }

    const output = tasks.get({ plain: true });

    output.team_member = await tasks.getTeam_member({
      transaction,
    });

    output.project = await tasks.getProject({
      transaction,
    });

    output.owner = await tasks.getOwner({
      transaction,
    });

    output.task = await tasks.getTask({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.team_members,
        as: 'team_member',
      },

      {
        model: db.projects,
        as: 'project',
      },

      {
        model: db.users,
        as: 'owner',
      },

      {
        model: db.tasks,
        as: 'task',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tasks', 'title', filter.title),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('tasks', 'content', filter.content),
        };
      }

      if (filter.starttimeRange) {
        const [start, end] = filter.starttimeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            starttime: {
              ...where.starttime,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            starttime: {
              ...where.starttime,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priorityRange) {
        const [start, end] = filter.priorityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            priority: {
              ...where.priority,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            priority: {
              ...where.priority,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.statusRange) {
        const [start, end] = filter.statusRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            status: {
              ...where.status,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            status: {
              ...where.status,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.team_member) {
        var listItems = filter.team_member.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          team_memberId: { [Op.or]: listItems },
        };
      }

      if (filter.project) {
        var listItems = filter.project.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          projectId: { [Op.or]: listItems },
        };
      }

      if (filter.owner) {
        var listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.task) {
        var listItems = filter.task.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          taskId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.tasks.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.tasks.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('tasks', 'id', query),
        ],
      };
    }

    const records = await db.tasks.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};

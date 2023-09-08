const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EventsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        event_type: data.event_type || null,
        event_order: data.event_order || null,
        properties: data.properties || null,
        trigger_date: data.trigger_date || null,
        trigger_interval: data.trigger_interval || null,
        trigger_interval_unit: data.trigger_interval_unit || null,
        trigger_hour: data.trigger_hour || null,
        trigger_restricted_start_hour:
          data.trigger_restricted_start_hour || null,
        trigger_restricted_stop_hour: data.trigger_restricted_stop_hour || null,
        trigger_restricted_dow: data.trigger_restricted_dow || null,
        trigger_mode: data.trigger_mode || null,
        decision_path: data.decision_path || null,
        temp_id: data.temp_id || null,
        channel: data.channel || null,
        channel_id: data.channel_id || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await events.setProject(data.project || null, {
      transaction,
    });

    await events.setEvent(data.event || null, {
      transaction,
    });

    return events;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const eventsData = data.map((item) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      event_type: item.event_type || null,
      event_order: item.event_order || null,
      properties: item.properties || null,
      trigger_date: item.trigger_date || null,
      trigger_interval: item.trigger_interval || null,
      trigger_interval_unit: item.trigger_interval_unit || null,
      trigger_hour: item.trigger_hour || null,
      trigger_restricted_start_hour: item.trigger_restricted_start_hour || null,
      trigger_restricted_stop_hour: item.trigger_restricted_stop_hour || null,
      trigger_restricted_dow: item.trigger_restricted_dow || null,
      trigger_mode: item.trigger_mode || null,
      decision_path: item.decision_path || null,
      temp_id: item.temp_id || null,
      channel: item.channel || null,
      channel_id: item.channel_id || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    }));

    // Bulk create items
    const events = await db.events.bulkCreate(eventsData, { transaction });

    // For each item created, replace relation files

    return events;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findByPk(id, {
      transaction,
    });

    await events.update(
      {
        name: data.name || null,
        description: data.description || null,
        event_type: data.event_type || null,
        event_order: data.event_order || null,
        properties: data.properties || null,
        trigger_date: data.trigger_date || null,
        trigger_interval: data.trigger_interval || null,
        trigger_interval_unit: data.trigger_interval_unit || null,
        trigger_hour: data.trigger_hour || null,
        trigger_restricted_start_hour:
          data.trigger_restricted_start_hour || null,
        trigger_restricted_stop_hour: data.trigger_restricted_stop_hour || null,
        trigger_restricted_dow: data.trigger_restricted_dow || null,
        trigger_mode: data.trigger_mode || null,
        decision_path: data.decision_path || null,
        temp_id: data.temp_id || null,
        channel: data.channel || null,
        channel_id: data.channel_id || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await events.setProject(data.project || null, {
      transaction,
    });

    await events.setEvent(data.event || null, {
      transaction,
    });

    return events;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findByPk(id, options);

    await events.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await events.destroy({
      transaction,
    });

    return events;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findOne({ where }, { transaction });

    if (!events) {
      return events;
    }

    const output = events.get({ plain: true });

    output.channels_event = await events.getChannels_event({
      transaction,
    });

    output.project = await events.getProject({
      transaction,
    });

    output.event = await events.getEvent({
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
        model: db.projects,
        as: 'project',
      },

      {
        model: db.events,
        as: 'event',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'description', filter.description),
        };
      }

      if (filter.event_type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'event_type', filter.event_type),
        };
      }

      if (filter.properties) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'properties', filter.properties),
        };
      }

      if (filter.trigger_interval_unit) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'trigger_interval_unit',
            filter.trigger_interval_unit,
          ),
        };
      }

      if (filter.trigger_restricted_dow) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'trigger_restricted_dow',
            filter.trigger_restricted_dow,
          ),
        };
      }

      if (filter.trigger_mode) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'trigger_mode', filter.trigger_mode),
        };
      }

      if (filter.decision_path) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'decision_path',
            filter.decision_path,
          ),
        };
      }

      if (filter.temp_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'temp_id', filter.temp_id),
        };
      }

      if (filter.channel) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('events', 'channel', filter.channel),
        };
      }

      if (filter.event_orderRange) {
        const [start, end] = filter.event_orderRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            event_order: {
              ...where.event_order,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            event_order: {
              ...where.event_order,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.trigger_dateRange) {
        const [start, end] = filter.trigger_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            trigger_date: {
              ...where.trigger_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            trigger_date: {
              ...where.trigger_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.trigger_intervalRange) {
        const [start, end] = filter.trigger_intervalRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            trigger_interval: {
              ...where.trigger_interval,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            trigger_interval: {
              ...where.trigger_interval,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.trigger_hourRange) {
        const [start, end] = filter.trigger_hourRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            trigger_hour: {
              ...where.trigger_hour,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            trigger_hour: {
              ...where.trigger_hour,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.trigger_restricted_start_hourRange) {
        const [start, end] = filter.trigger_restricted_start_hourRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            trigger_restricted_start_hour: {
              ...where.trigger_restricted_start_hour,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            trigger_restricted_start_hour: {
              ...where.trigger_restricted_start_hour,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.trigger_restricted_stop_hourRange) {
        const [start, end] = filter.trigger_restricted_stop_hourRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            trigger_restricted_stop_hour: {
              ...where.trigger_restricted_stop_hour,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            trigger_restricted_stop_hour: {
              ...where.trigger_restricted_stop_hour,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.channel_idRange) {
        const [start, end] = filter.channel_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            channel_id: {
              ...where.channel_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            channel_id: {
              ...where.channel_id,
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

      if (filter.project) {
        var listItems = filter.project.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          projectId: { [Op.or]: listItems },
        };
      }

      if (filter.event) {
        var listItems = filter.event.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          eventId: { [Op.or]: listItems },
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
          count: await db.events.count({
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
      : await db.events.findAndCountAll({
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
          Utils.ilike('events', 'id', query),
        ],
      };
    }

    const records = await db.events.findAll({
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

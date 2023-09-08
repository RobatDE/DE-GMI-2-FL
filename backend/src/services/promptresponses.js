const db = require('../db/models');
const PromptresponsesDBApi = require('../db/api/promptresponses');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

module.exports = class PromptresponsesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await PromptresponsesDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async bulkImport(req, res, sendInvitationEmails = true, host) {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new stream.PassThrough();
      const results = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await PromptresponsesDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let promptresponses = await PromptresponsesDBApi.findBy(
        { id },
        { transaction },
      );

      if (!promptresponses) {
        throw new ValidationError('promptresponsesNotFound');
      }

      await PromptresponsesDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return promptresponses;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await PromptresponsesDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

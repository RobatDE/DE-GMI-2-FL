const db = require('../db/models');
const PromptDBApi = require('../db/api/prompts');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

let wrench_ai_base_url = "https://qa-api.web.wrench.ai/";

module.exports = class WrenchService {

  
      //     curl -X POST \
      //   https://api.web.wrench.ai/create-api-key \
      //   -H 'content-type: application/json' \
      //   -d '{
      //     "username":"rob@digitalexhaust.co"
      //     "password":"Chui2022@@"
      // }'
  static async getapikey(data, currentUser) {
    axios.defaults.baseURL = "https://api.web.wrench.ai";
    axios.post('/create-api-key', {
      "username":"rob@digitalexhaust.co",
      "password":"Chui2022@@"
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  static async prompt(data, currentUser) {
    
    ///this.$axios({ url: 'items', baseURL: 'http://new-url.com' });
    axios.defaults.baseURL = "https://api.web.wrench.ai";
    axios.post('/login', {
      firstName: 'Finn',
      lastName: 'Williams'
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }

  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await WrenchDBApi.create(data, {
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

      await WrenchDBApi.bulkImport(results, {
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
      let wrench = await WrenchDBApi.findBy({ id }, { transaction });

      if (!wrench) {
        throw new ValidationError('wrenchNotFound');
      }

      await WrenchDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return wrench;
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

      await WrenchDBApi.remove(id, {
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

const db = require('../db/models');
const OnetWebService = require('./OnetWebService');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

const onet_ws = new OnetWebService(process.env.ONET_NAME, process.env.ONET_PSWD);

module.exports = class PositionsService {
  static async  findBy(path, query){
   
    try {
      console.log('-------------------------------- FindBy Position Service path:'+ JSON.stringify(path) +', query:'+JSON.stringify(query));
      const results = await onet_ws.call(path, query);
      const newresults = await this.enhance(results, path, query);
      console.log('-------------------------------- position-service-findby id:'+JSON.stringify(newresults));
      return results;
    } catch (error) {
      throw error;
    }
  }
  static async  findAll(path, query){
   
    try {
      console.log('-------------------------------- FindAll Position Service path:'+ JSON.stringify(path) +', query:'+query);

      const results = await onet_ws.call(path, query);
      return results;
    } catch (error) {
      throw error;
    }
  }
  static async findAllAutocomplete(query,limit){

  }
  static async enhance(position, path, query){
       let positionOObj = position;

       position['summary_resources']['resource'].forEach(element => {
          
        console.log('enhancing posioin object childre:'+element)
        });
       return position;
  }
};

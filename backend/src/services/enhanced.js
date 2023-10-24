const db = require('../db/models');
const axios = require('axios');
const PromptsDBApi = require('../db/api/prompts');
const processFile = require('../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');



module.exports = class EnhancedService {

//  curl -X 'POST' \
//  'https://api-dev.fluxprompt.ai/flux/api-v2?flowId=9066' \
//-H 'accept: application/json' \
//-H 'api-key: FLUX_API.01b37cd9-38c0-4c95-9e07-0d27b5995580' \
//-H 'Content-Type: application/json' \
//   -d '{
//   "inputText": "string",
//   "variableInputs": [
//     {
//       "inputId": "string",
//       "inputText": "string"
//     }
//   ]
// }'

// API key for enhanced AI
// FLUX_API.01b37cd9-38c0-4c95-9e07-0d27b5995580

 static enhancedAIAPI =  "https://api-dev.fluxprompt.ai/flux/api-v2?flowId=9066";
 static enhancedAIKey = 'FLUX_API.01b37cd9-38c0-4c95-9e07-0d27b5995580';
 static enhancedAIBody =  {
   "inputText": "Summarize the marketing for business google.com",
  "variableInputs": 
          [{
          "inputId":"varInputNode_1692644955479_0.9066",
          "inputText":"Example  1 Text For Input "
          },
          {
          "inputId":"varInputNode_1696860076535_0.8819",
          "inputText":"Example  2 Text For Input "
          }]
}

  static options = {
    headers: [
              {'accept': 'application/json'},
              {'Content-Type': 'application/json'},
              {'api-key': 'FLUX_API.01b37cd9-38c0-4c95-9e07-0d27b5995580'}
             ]
  };

  static async post_prompt(data, currentUser) {
    console.log("Inside post prompt");
    try {
      axios.post( enhancedAIAPI, enhancedAIBody, options )
        .then(res => {
          console.log(res.data);
          res.data; 
        });
    } catch (error) {
      throw error;
    }
  }

};

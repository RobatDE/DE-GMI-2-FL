const express = require('express');

const EnhancedService = require('../services/enhanced');
const PromptsDBApi = require('../db/api/prompts');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      EnhancedAI:
 *        type: object
 *        properties:
 * 
 *          name:
 *            type: string
 *            default: name
 *          prompt:
 *            type: string
 *            default: prompt
 *          jsonprompt:
 *            type: string
 *            default: jsonprompt

 */

/**
 *  @swagger
 * tags:
 *   name: EnhancedAI
 *   description: The EnhancedAI managing API
 */

/**
 *  @swagger
 *  /api/enhanced:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Post a prompt to endhanced AI 
 *      description: Post a prompt to endhanced AI 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/EnhancedAI"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/EnhancedAI"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post(
  '/',
  wrapAsync(async (req, res) => {
    console.log("inside route ");
    await EnhancedService.post_prompt(
      req.body.data,
      req.currentUser,
      true,
      req.headers.referer,
    ); 
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/enhanced/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Post a prompt to endhanced AI using an existing prompt
 *      description: Post a prompt to endhanced AI using an existing prompt 
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID of the source prompt
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Enhanced AI body to combine with prompt
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/EnhancedAI"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/EnhancedAI"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await EnhancedService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/enhanced/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Mark the prompt and prompt response as Deleted
 *      description: Mark the prompt and prompt response as Deleted
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Prompt ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/EnhancedAI"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await EnhancedService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/enhanced:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Get all prompts for enhanced 
 *      description: Get all prompts for enhanced 
 *      responses:
 *        200:
 *          description: EnhancedAI list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/EnhancedAI"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;
    const payload = await PromptsDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = ['id', 'name', 'prompt', 'jsonprompt'];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/enhanced/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Count all enhanced prompts
 *      description: Count all enhanced prompts
 *      responses:
 *        200:
 *          description: EnhancedAI count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/EnhancedAI"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const payload = await PromptsDBApi.findAll(req.query, { countOnly: true });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/enhanced/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Find all enhanced prompts that match search criteria
 *      description: Find all enhanced prompts that match search criteria
 *      responses:
 *        200:
 *          description: EnhancedAI list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/EnhancedAI"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await PromptsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/enhanced/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [EnhancedAI]
 *      summary: Get selected prompt and return promptresponse
 *      description: Get selected prompt and return promptresponse
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/EnhancedAI"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await PromptsDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

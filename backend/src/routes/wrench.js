const express = require('express');

const WrenchService = require('../services/wrench');
const PromptsDBApi = require('../db/api/prompts');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      WrenchAI:
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
 *   name: WrenchAI
 *   description: The WrenchAI managing API
 */

/**
 *  @swagger
 *  /api/wrench:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
 *      summary: Post a prompt to Wrench AI 
 *      description: Post a prompt to Wrench AI 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/WrenchAI"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/WrenchAI"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post(
  '/ ',
  wrapAsync(async (req, res) => {
    await WrenchService.create(
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
 *  /api/wrench/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
 *      summary: Post a prompt to Wrench AI using an existing prompt
 *      description: Post a prompt to Wrench AI using an existing prompt 
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID of the source prompt
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Wrench AI body to combine with prompt
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
 *                  $ref: "#/components/schemas/WrenchAI"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/WrenchAI"
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
    await WrenchService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/wrench/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
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
 *                $ref: "#/components/schemas/WrenchAI"
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
    await WrenchService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/wrench:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
 *      summary: Get all prompts for wrench 
 *      description: Get all prompts for wrench 
 *      responses:
 *        200:
 *          description: WrenchAI list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/WrenchAI"
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
 *  /api/wrench/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
 *      summary: Count all wrench prompts
 *      description: Count all wrench prompts
 *      responses:
 *        200:
 *          description: WrenchAI count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/WrenchAI"
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
 *  /api/wrench/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
 *      summary: Find all wrench prompts that match search criteria
 *      description: Find all wrench prompts that match search criteria
 *      responses:
 *        200:
 *          description: WrenchAI list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/WrenchAI"
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
 *  /api/wrench/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [WrenchAI]
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
 *                $ref: "#/components/schemas/WrenchAI"
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

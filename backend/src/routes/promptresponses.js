const express = require('express');

const PromptresponsesService = require('../services/promptresponses');
const PromptresponsesDBApi = require('../db/api/promptresponses');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Promptresponses:
 *        type: object
 *        properties:

 *          name:
 *            type: string
 *            default: name
 *          engine:
 *            type: string
 *            default: engine
 *          model:
 *            type: string
 *            default: model
 *          prompt:
 *            type: string
 *            default: prompt
 *          response:
 *            type: string
 *            default: response
 *          jsonprompt:
 *            type: string
 *            default: jsonprompt
 *          jsonresponse:
 *            type: string
 *            default: jsonresponse

 */

/**
 *  @swagger
 * tags:
 *   name: Promptresponses
 *   description: The Promptresponses managing API
 */

/**
 *  @swagger
 *  /api/promptresponses:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Promptresponses"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Promptresponses"
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
    await PromptresponsesService.create(
      req.body.data,
      req.currentUser,
      true,
      req.headers.referer,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    await PromptresponsesService.bulkImport(
      req,
      res,
      true,
      req.headers.referer,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/promptresponses/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
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
 *                  $ref: "#/components/schemas/Promptresponses"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Promptresponses"
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
    await PromptresponsesService.update(
      req.body.data,
      req.body.id,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/promptresponses/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Promptresponses"
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
    await PromptresponsesService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/promptresponses:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Get all promptresponses
 *      description: Get all promptresponses
 *      responses:
 *        200:
 *          description: Promptresponses list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Promptresponses"
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
    const payload = await PromptresponsesDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'name',
        'engine',
        'model',
        'prompt',
        'response',
        'jsonprompt',
        'jsonresponse',
      ];
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
 *  /api/promptresponses/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Count all promptresponses
 *      description: Count all promptresponses
 *      responses:
 *        200:
 *          description: Promptresponses count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Promptresponses"
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
    const payload = await PromptresponsesDBApi.findAll(req.query, {
      countOnly: true,
    });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/promptresponses/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Find all promptresponses that match search criteria
 *      description: Find all promptresponses that match search criteria
 *      responses:
 *        200:
 *          description: Promptresponses list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Promptresponses"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await PromptresponsesDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/promptresponses/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Promptresponses]
 *      summary: Get selected item
 *      description: Get selected item
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
 *                $ref: "#/components/schemas/Promptresponses"
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
    const payload = await PromptresponsesDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

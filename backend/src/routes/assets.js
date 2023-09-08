const express = require('express');

const AssetsService = require('../services/assets');
const AssetsDBApi = require('../db/api/assets');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Assets:
 *        type: object
 *        properties:

 *          title:
 *            type: string
 *            default: title
 *          description:
 *            type: string
 *            default: description
 *          alias:
 *            type: string
 *            default: alias
 *          storage_location:
 *            type: string
 *            default: storage_location
 *          path:
 *            type: string
 *            default: path
 *          url:
 *            type: string
 *            default: url
 *          remote_path:
 *            type: string
 *            default: remote_path
 *          original_file_name:
 *            type: string
 *            default: original_file_name
 *          lang:
 *            type: string
 *            default: lang
 *          extension:
 *            type: string
 *            default: extension
 *          mime:
 *            type: string
 *            default: mime

 *          download_count:
 *            type: integer
 *            format: int64
 *          unique_download_count:
 *            type: integer
 *            format: int64
 *          revision:
 *            type: integer
 *            format: int64
 *          size:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Assets
 *   description: The Assets managing API
 */

/**
 *  @swagger
 *  /api/assets:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
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
 *                  $ref: "#/components/schemas/Assets"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Assets"
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
    await AssetsService.create(
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
    await AssetsService.bulkImport(req, res, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/assets/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
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
 *                  $ref: "#/components/schemas/Assets"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Assets"
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
    await AssetsService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/assets/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
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
 *                $ref: "#/components/schemas/Assets"
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
    await AssetsService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/assets:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
 *      summary: Get all assets
 *      description: Get all assets
 *      responses:
 *        200:
 *          description: Assets list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Assets"
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
    const payload = await AssetsDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'title',
        'description',
        'alias',
        'storage_location',
        'path',
        'url',
        'remote_path',
        'original_file_name',
        'lang',
        'extension',
        'mime',
        'download_count',
        'unique_download_count',
        'revision',
        'size',

        'date_added',
        'date_modified',
        'checked_out',
        'publish_up',
        'publish_down',
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
 *  /api/assets/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
 *      summary: Count all assets
 *      description: Count all assets
 *      responses:
 *        200:
 *          description: Assets count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Assets"
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
    const payload = await AssetsDBApi.findAll(req.query, { countOnly: true });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/assets/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
 *      summary: Find all assets that match search criteria
 *      description: Find all assets that match search criteria
 *      responses:
 *        200:
 *          description: Assets list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Assets"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await AssetsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/assets/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Assets]
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
 *                $ref: "#/components/schemas/Assets"
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
    const payload = await AssetsDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

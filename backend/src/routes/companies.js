const express = require('express');

const CompaniesService = require('../services/companies');
const CompaniesDBApi = require('../db/api/companies');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Companies:
 *        type: object
 *        properties:

 *          social_cache:
 *            type: string
 *            default: social_cache
 *          companyemail:
 *            type: string
 *            default: companyemail
 *          companyaddress1:
 *            type: string
 *            default: companyaddress1
 *          companyaddress2:
 *            type: string
 *            default: companyaddress2
 *          companyphone:
 *            type: string
 *            default: companyphone
 *          companycity:
 *            type: string
 *            default: companycity
 *          companystate:
 *            type: string
 *            default: companystate
 *          companyzipcode:
 *            type: string
 *            default: companyzipcode
 *          companycountry:
 *            type: string
 *            default: companycountry
 *          companyname:
 *            type: string
 *            default: companyname
 *          companywebsite:
 *            type: string
 *            default: companywebsite
 *          companyindustry:
 *            type: string
 *            default: companyindustry
 *          companydescription:
 *            type: string
 *            default: companydescription
 *          companyfax:
 *            type: string
 *            default: companyfax

 *          checked_out_by:
 *            type: integer
 *            format: int64
 *          score:
 *            type: integer
 *            format: int64
 *          companynumber_of_employees:
 *            type: integer
 *            format: int64
 *          companyannual_revenue:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Companies
 *   description: The Companies managing API
 */

/**
 *  @swagger
 *  /api/companies:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
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
 *                  $ref: "#/components/schemas/Companies"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Companies"
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
    await CompaniesService.create(
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
    await CompaniesService.bulkImport(req, res, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/companies/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
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
 *                  $ref: "#/components/schemas/Companies"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Companies"
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
    await CompaniesService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/companies/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
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
 *                $ref: "#/components/schemas/Companies"
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
    await CompaniesService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/companies:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
 *      summary: Get all companies
 *      description: Get all companies
 *      responses:
 *        200:
 *          description: Companies list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Companies"
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
    const payload = await CompaniesDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'social_cache',
        'companyemail',
        'companyaddress1',
        'companyaddress2',
        'companyphone',
        'companycity',
        'companystate',
        'companyzipcode',
        'companycountry',
        'companyname',
        'companywebsite',
        'companyindustry',
        'companydescription',
        'companyfax',
        'checked_out_by',
        'score',
        'companynumber_of_employees',
        'companyannual_revenue',

        'date_added',
        'date_modified',
        'checked_out',
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
 *  /api/companies/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
 *      summary: Count all companies
 *      description: Count all companies
 *      responses:
 *        200:
 *          description: Companies count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Companies"
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
    const payload = await CompaniesDBApi.findAll(req.query, {
      countOnly: true,
    });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/companies/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
 *      summary: Find all companies that match search criteria
 *      description: Find all companies that match search criteria
 *      responses:
 *        200:
 *          description: Companies list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Companies"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await CompaniesDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/companies/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Companies]
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
 *                $ref: "#/components/schemas/Companies"
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
    const payload = await CompaniesDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

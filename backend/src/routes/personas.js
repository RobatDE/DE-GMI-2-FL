const express = require('express');

const PersonasService = require('../services/personas');
const PersonasDBApi = require('../db/api/personas');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Personas:
 *        type: object
 *        properties:
 *            PersonaID:
 *              type: integer
 *            Name:
 *              type: string
 *            Description:
 *              type: string
 *            Gender:
 *              type: string
 *            GenderIdentity:
 *              type: string
 *            Occupation:
 *              type: string
 *            EducationLevel:
 *              type: string
 *            IncomeRange:
 *              type: string
 *            Age:
 *              type: integer
 *            AgeRange:
 *              type: string
 *            MaritalStatus:
 *              type: string
 *            EmploymentType:
 *              type: string
 *            Race:
 *              type: string
 *            Language:
 *              type: string
 *            Nationality:
 *              type: string
 *            Geography:
 *              type: string
 *            HouseholdComposition:
 *              type: string
 *            Ethnicity:
 *              type: string
 */
/**
 *  @swagger
 * tags:
 *   name: Personas
 *   description: The Personas managing API
 */

/**
 *  @swagger
 *  /api/personas:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
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
 *                  $ref: "#/components/schemas/Personas"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Personas"
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
    await PersonasService.create(
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
    await PersonasService.bulkImport(req, res, true, req.headers.referer);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/personas/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
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
 *                  $ref: "#/components/schemas/Personas"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Personas"
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
    await PersonasService.update(req.body.data, req.body.id, req.currentUser);
    console.log('---------------------inside put...'+JSON.stringify(req.body.data))
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/personas/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
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
 *                $ref: "#/components/schemas/Personas"
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
    await PersonasService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/personas:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
 *      summary: Get all personas
 *      description: Get all personas
 *      responses:
 *        200:
 *          description: Personas list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Personas"
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
    console.log('------------get-findall-personas-query:'+JSON.stringify(req.query));
    const filetype = req.query.filetype;
    const payload = await PersonasDBApi.findAll(req.query);
    console.log('------------get-findall-personas-response:'+JSON.stringify(payload));
    
    if (filetype && filetype === 'csv') {
      const fields = ['id', 'name', 'segment'];
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
 *  /api/personas/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
 *      summary: Count all personas
 *      description: Count all personas
 *      responses:
 *        200:
 *          description: Personas count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Personas"
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
    const payload = await PersonasDBApi.findAll(req.query, { countOnly: true });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/personas/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
 *      summary: Find all personas that match search criteria
 *      description: Find all personas that match search criteria
 *      responses:
 *        200:
 *          description: Personas list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Personas"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await PersonasDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/personas/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Personas]
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
 *                $ref: "#/components/schemas/Personas"
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
    const payload = await PersonasDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

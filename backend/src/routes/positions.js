const express = require('express');

const PositionsService = require('../services/positions');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');
const { json } = require('sequelize');
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Positions:
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
 *   name: Positions
 *   description: The Positions managing API
 */

/**
 *  @swagger
 *  /api/positions:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Positions]
 *      summary: Get all positions
 *      description: Get all positions
 *      responses:
 *        200:
 *          description: Positions list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Positions"
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
    let payload = await PositionsService.findAll('online/occupations', req.query);

    console.log('------------get-findall-');
    try {
        console.log('----------------------------')
        console.log(JSON.stringify(payload));
        payload.data.occupation.forEach(element => {
            element.id = element.code
        });
        var jsonResponse = {
            rows: payload.data.occupation,
            count: payload.data.end - (payload.data.start-1),
            start: payload.data.start,
            end: payload.data.end ,
            total: payload.data.total

        }

      } catch (err) {
          console.error(err);
        }
        console.log(JSON.stringify(jsonResponse));
        res.status(200).send(jsonResponse)
      }
  ),
);

/**
 *  @swagger
 *  /api/positions/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Positions]
 *      summary: Count all positions
 *      description: Count all positions
 *      responses:
 *        200:
 *          description: Positions count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Positions"
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
    console.log('------------get-count-');
    const payload = await PositionsService.findAll(req.query, { countOnly: true });

    res.status(200).send(payload);
  }),
);

// https://services.onetcenter.org/ws/online/occupations/[O*NET-SOC Code]/
/**
 *  @swagger
 *  /api/positions/summary/:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Positions]
 *      summary: Find  position details for a specific code
 *      responses:
 *        200:
 *          description: Position successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Positions"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  console.log('------------get-auto-');
  const payload = await PositionsService.get(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/positions/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Positions]
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
 *                $ref: "#/components/schemas/Positions"
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
    console.log('------------get-findby id-');
    const payload = await PositionsService.findBy('/online/occupations/'+req.params.id+'/', { id: req.params.id });

    res.status(200).send(payload.data);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;

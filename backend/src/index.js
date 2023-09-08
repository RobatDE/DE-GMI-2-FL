const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const usersRoutes = require('./routes/users');

const assetsRoutes = require('./routes/assets');

const categoriesRoutes = require('./routes/categories');

const channelsRoutes = require('./routes/channels');

const companiesRoutes = require('./routes/companies');

const programsRoutes = require('./routes/programs');

const campaignsRoutes = require('./routes/campaigns');

const projectsRoutes = require('./routes/projects');

const eventsRoutes = require('./routes/events');

const tasksRoutes = require('./routes/tasks');

const teamsRoutes = require('./routes/teams');

const marketsRoutes = require('./routes/markets');

const opportunitiesRoutes = require('./routes/opportunities');

const organizationsRoutes = require('./routes/organizations');

const promptsRoutes = require('./routes/prompts');

const team_membersRoutes = require('./routes/team_members');

const promptresponsesRoutes = require('./routes/promptresponses');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'DE-GMI-2',
      description:
        'DE-GMI-2 Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/assets',
  passport.authenticate('jwt', { session: false }),
  assetsRoutes,
);

app.use(
  '/api/categories',
  passport.authenticate('jwt', { session: false }),
  categoriesRoutes,
);

app.use(
  '/api/channels',
  passport.authenticate('jwt', { session: false }),
  channelsRoutes,
);

app.use(
  '/api/companies',
  passport.authenticate('jwt', { session: false }),
  companiesRoutes,
);

app.use(
  '/api/programs',
  passport.authenticate('jwt', { session: false }),
  programsRoutes,
);

app.use(
  '/api/campaigns',
  passport.authenticate('jwt', { session: false }),
  campaignsRoutes,
);

app.use(
  '/api/projects',
  passport.authenticate('jwt', { session: false }),
  projectsRoutes,
);

app.use(
  '/api/events',
  passport.authenticate('jwt', { session: false }),
  eventsRoutes,
);

app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  tasksRoutes,
);

app.use(
  '/api/teams',
  passport.authenticate('jwt', { session: false }),
  teamsRoutes,
);

app.use(
  '/api/markets',
  passport.authenticate('jwt', { session: false }),
  marketsRoutes,
);

app.use(
  '/api/opportunities',
  passport.authenticate('jwt', { session: false }),
  opportunitiesRoutes,
);

app.use(
  '/api/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationsRoutes,
);

app.use(
  '/api/prompts',
  passport.authenticate('jwt', { session: false }),
  promptsRoutes,
);

app.use(
  '/api/team_members',
  passport.authenticate('jwt', { session: false }),
  team_membersRoutes,
);

app.use(
  '/api/promptresponses',
  passport.authenticate('jwt', { session: false }),
  promptresponsesRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;

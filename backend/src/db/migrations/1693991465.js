      //CREATE EXTENSION IF NOT EXISTS pgcrypto;
      //  defaultValue: literal('gen_random_uuid()'),            

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;'
      );
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'assets',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'categories',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'channels',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'companies',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'programs',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'campaigns',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'projects',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'events',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'tasks',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'teams',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'markets',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'opportunities',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'organizations',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'prompts',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'team_members',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'promptresponses',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'applicants',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            //defaultValue: literal('gen_random_uuid()'),            
            primaryKey: true,
          },          
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );  
      await queryInterface.addColumn(
        'applicants',
        'FirstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'MiddleName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'applicants',
        'LastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'applicants',
        'Description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Gender',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'GenderIdentity',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Occupation',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Industry',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'EducationLevel',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'IncomeRange',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['1','2','3','4','5','6'],
        }, 
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Age',
        { type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'MaritalStatus',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'EmploymentType',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'applicants',
        'HouseholdComposition',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'applicants',
        'Income',
        { type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'applicants',
        'Religion',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Nationality',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'applicants',
        'Geography',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'applicants',
        'Ethnicity',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'Languages',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'AssociationssDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'PersonalityDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'PositionDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'CommunicationsDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'applicants',
        'CertificationsDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'personas',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            //defaultValue: literal('gen_random_uuid()'),            
            primaryKey: true,
          },          
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );  

      await queryInterface.addColumn(
        'personas',
        'Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'personas',
        'Description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'IncomeRange',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['1','2','3','4','5','6'],
        }, 
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'Age',
        { type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'personas',
        'Gender',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'GenderIdentity',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'Occupation',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'EducationLevel',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'MaritalStatus',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'EmploymentType',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'HouseholdComposition',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'Income',
        { type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'Religion',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'Nationality',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'Geography',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'Ethnicity',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'Race',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      
      await queryInterface.addColumn(
        'personas',
        'Language',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'personas',
        'PoliticalAffiliation',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'HomeOwnership',
        { type: Sequelize.DataTypes.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'PersonalityDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'PositionDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'CommunicationsDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'FrustrationDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'personas',
        'MotivationsDetails',
        { type: Sequelize.DataTypes.JSON,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'needs',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );  


      await queryInterface.addColumn(
        'needs',
        'Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'needs',
        'Description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.createTable(
        'behaviors',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );  


      await queryInterface.addColumn(
        'behaviors',
        'Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'behaviors',
        'Description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );


      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'role',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['admin', 'user'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'categoryId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'categories',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'is_published',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'checked_out',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'checked_out_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'alias',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'storage_location',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'path',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'remote_path',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'original_file_name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'lang',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'publish_up',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'publish_down',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'download_count',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'unique_download_count',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'revision',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'extension',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'mime',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'size',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'assets',
        'disallow',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'is_published',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'modified_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'checked_out',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'checked_out_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'alias',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'color',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'bundle',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'checked_out_by',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'categories',
        'categoryId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'categories',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'eventId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'events',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'ownerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'redirect_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'channel',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'content',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'hits',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'unique_hits',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'channels',
        'redirectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'channels',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'ownerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'is_published',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'modified_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'checked_out',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'checked_out_by',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'checked_out_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'social_cache',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'score',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyemail',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyaddress1',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyaddress2',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyphone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companycity',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companystate',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyzipcode',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companycountry',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyname',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companywebsite',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyindustry',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companydescription',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companynumber_of_employees',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyfax',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'companies',
        'companyannual_revenue',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'companies',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'modified_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'goal',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'programs',
        'allow_restart',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'programId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'programs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'is_published',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'modified_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'checked_out',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'checked_out_by',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'checked_out_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'publish_up',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'publish_down',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'canvas_settings',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'campaigns',
        'allow_restart',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'campaingId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'campaigns',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'teamId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'teams',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'date_added',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'created_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'date_modified',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'modified_by',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'modified_by_userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'public_on',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'start_on',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'projects',
        'end_on',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'event_type',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'event_order',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'properties',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_interval',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_interval_unit',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_hour',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_restricted_start_hour',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_restricted_stop_hour',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_restricted_dow',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'trigger_mode',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'decision_path',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'temp_id',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'channel',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'channel_id',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'events',
        'eventId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'events',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'team_memberId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'team_members',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'title',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'content',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'starttime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'priority',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'status',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'ownerId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'taskId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'tasks',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'projectId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'projects',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'markets',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'companies',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'markets',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'markets',
        'segment',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opportunities',
        'companyId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'companies',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opportunities',
        'marketId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'markets',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opportunities',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'opportunities',
        'public_on',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organizations',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'prompts',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'prompts',
        'prompt',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'prompts',
        'jsonprompt',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'team_members',
        'teamId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'teams',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'team_members',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'team_members',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'team_members',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'programId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'programs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'engine',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'model',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'prompt',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'response',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'prompt_idId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'prompts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'jsonprompt',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'promptresponses',
        'jsonresponse',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('promptresponses', 'jsonresponse', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'jsonprompt', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'prompt_idId', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'response', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'prompt', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'model', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'engine', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('promptresponses', 'programId', {
        transaction,
      });

      await queryInterface.removeColumn('team_members', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('team_members', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('team_members', 'userId', {
        transaction,
      });

      await queryInterface.removeColumn('team_members', 'teamId', {
        transaction,
      });

      await queryInterface.removeColumn('prompts', 'jsonprompt', {
        transaction,
      });

      await queryInterface.removeColumn('prompts', 'prompt', { transaction });

      await queryInterface.removeColumn('prompts', 'name', { transaction });

      await queryInterface.removeColumn('organizations', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('opportunities', 'public_on', {
        transaction,
      });

      await queryInterface.removeColumn('opportunities', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('opportunities', 'marketId', {
        transaction,
      });

      await queryInterface.removeColumn('opportunities', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('markets', 'segment', { transaction });

      await queryInterface.removeColumn('markets', 'name', { transaction });

      await queryInterface.removeColumn('markets', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('teams', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('teams', 'name', { transaction });

      await queryInterface.removeColumn('teams', 'projectId', { transaction });

      await queryInterface.removeColumn('tasks', 'taskId', { transaction });

      await queryInterface.removeColumn('tasks', 'ownerId', { transaction });

      await queryInterface.removeColumn('tasks', 'status', { transaction });

      await queryInterface.removeColumn('tasks', 'priority', { transaction });

      await queryInterface.removeColumn('tasks', 'starttime', { transaction });

      await queryInterface.removeColumn('tasks', 'content', { transaction });

      await queryInterface.removeColumn('tasks', 'title', { transaction });

      await queryInterface.removeColumn('tasks', 'projectId', { transaction });

      await queryInterface.removeColumn('tasks', 'team_memberId', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'eventId', { transaction });

      await queryInterface.removeColumn('events', 'channel_id', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'channel', { transaction });

      await queryInterface.removeColumn('events', 'temp_id', { transaction });

      await queryInterface.removeColumn('events', 'decision_path', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'trigger_mode', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'trigger_restricted_dow', {
        transaction,
      });

      await queryInterface.removeColumn(
        'events',
        'trigger_restricted_stop_hour',
        { transaction },
      );

      await queryInterface.removeColumn(
        'events',
        'trigger_restricted_start_hour',
        { transaction },
      );

      await queryInterface.removeColumn('events', 'trigger_hour', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'trigger_interval_unit', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'trigger_interval', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'trigger_date', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'properties', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'event_order', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'event_type', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('events', 'name', { transaction });

      await queryInterface.removeColumn('events', 'projectId', { transaction });

      await queryInterface.removeColumn('projects', 'end_on', { transaction });

      await queryInterface.removeColumn('projects', 'start_on', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'public_on', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'modified_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'modified_by', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('projects', 'name', { transaction });

      await queryInterface.removeColumn('projects', 'teamId', { transaction });

      await queryInterface.removeColumn('projects', 'campaingId', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'allow_restart', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'canvas_settings', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'publish_down', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'publish_up', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'name', { transaction });

      await queryInterface.removeColumn('campaigns', 'checked_out_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'checked_out_by', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'checked_out', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'modified_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'is_published', {
        transaction,
      });

      await queryInterface.removeColumn('campaigns', 'programId', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'allow_restart', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'goal', { transaction });

      await queryInterface.removeColumn('programs', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'name', { transaction });

      await queryInterface.removeColumn('programs', 'modified_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('programs', 'companyId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyannual_revenue', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyfax', {
        transaction,
      });

      await queryInterface.removeColumn(
        'companies',
        'companynumber_of_employees',
        { transaction },
      );

      await queryInterface.removeColumn('companies', 'companydescription', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyindustry', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companywebsite', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyname', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companycountry', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyzipcode', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companystate', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companycity', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyphone', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyaddress2', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyaddress1', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'companyemail', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'score', { transaction });

      await queryInterface.removeColumn('companies', 'social_cache', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'checked_out_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'checked_out_by', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'checked_out', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'modified_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'is_published', {
        transaction,
      });

      await queryInterface.removeColumn('companies', 'ownerId', {
        transaction,
      });

      await queryInterface.removeColumn('channels', 'redirectId', {
        transaction,
      });

      await queryInterface.removeColumn('channels', 'unique_hits', {
        transaction,
      });

      await queryInterface.removeColumn('channels', 'hits', { transaction });

      await queryInterface.removeColumn('channels', 'content', { transaction });

      await queryInterface.removeColumn('channels', 'channel', { transaction });

      await queryInterface.removeColumn('channels', 'redirect_id', {
        transaction,
      });

      await queryInterface.removeColumn('channels', 'ownerId', { transaction });

      await queryInterface.removeColumn('channels', 'eventId', { transaction });

      await queryInterface.removeColumn('channels', 'projectId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'categoryId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'checked_out_by', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'projectId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'bundle', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'color', { transaction });

      await queryInterface.removeColumn('categories', 'alias', { transaction });

      await queryInterface.removeColumn('categories', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'title', { transaction });

      await queryInterface.removeColumn('categories', 'checked_out_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'checked_out', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'modified_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('categories', 'is_published', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'disallow', { transaction });

      await queryInterface.removeColumn('assets', 'size', { transaction });

      await queryInterface.removeColumn('assets', 'mime', { transaction });

      await queryInterface.removeColumn('assets', 'extension', { transaction });

      await queryInterface.removeColumn('assets', 'revision', { transaction });

      await queryInterface.removeColumn('assets', 'unique_download_count', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'download_count', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'publish_down', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'publish_up', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'lang', { transaction });

      await queryInterface.removeColumn('assets', 'original_file_name', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'remote_path', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'url', { transaction });

      await queryInterface.removeColumn('assets', 'path', { transaction });

      await queryInterface.removeColumn('assets', 'storage_location', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'alias', { transaction });

      await queryInterface.removeColumn('assets', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'title', { transaction });

      await queryInterface.removeColumn('assets', 'checked_out_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'checked_out', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'date_modified', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'created_by_userId', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'date_added', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'is_published', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'categoryId', {
        transaction,
      });

      await queryInterface.removeColumn('assets', 'projectId', { transaction });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'role', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('promptresponses', { transaction });

      await queryInterface.dropTable('team_members', { transaction });

      await queryInterface.dropTable('prompts', { transaction });

      await queryInterface.dropTable('organizations', { transaction });

      await queryInterface.dropTable('opportunities', { transaction });

      await queryInterface.dropTable('markets', { transaction });

      await queryInterface.dropTable('teams', { transaction });

      await queryInterface.dropTable('tasks', { transaction });

      await queryInterface.dropTable('events', { transaction });

      await queryInterface.dropTable('projects', { transaction });

      await queryInterface.dropTable('campaigns', { transaction });

      await queryInterface.dropTable('programs', { transaction });

      await queryInterface.dropTable('companies', { transaction });

      await queryInterface.dropTable('channels', { transaction });

      await queryInterface.dropTable('categories', { transaction });

      await queryInterface.dropTable('assets', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};

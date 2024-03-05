# #!/bin/bash
# set -e
# #   Update pg_hba_file_rules set address='0.0.0.0' WHERE type = 'host' and address = '127.0.0.1';
# # sed -i'.BACKUP' 's/127.0.0.1/0.0.0.0/g' /data/db/pg_hba.conf
# #   SELECT pg_reload_conf();

export POSTGRES_USER='postgres'
export POSTGRES_PROD_USER='postgresexpona'
export POSTGRES_PROD_PASSWORD='ExponaPassword1234'
export POSTGRES_DB='postgres'
export APP_DB_NAME='dedb'
export APP_DB_USER='expona'
export APP_DB_PASSWORD='ExponaPassword1234'

    # username: 'postgresexpona',
    # dialect: 'postgres',
    # password: 'ExponaPassword1234',
    # database: 'dedb',
    # host: 'db' || 'localhost',
    # logging: console.log,
    # seederStorage: 'sequelize',


psql -v ON_ERROR_STOP=1 -h localhost -p 5432 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE ROLE $POSTGRES_PROD_USER WITH LOGIN;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $POSTGRES_PROD_USER;
  ALTER USER $POSTGRES_PROD_USER with SUPERUSER;
  ALTER ROLE $POSTGRES_PROD_USER WITH PASSWORD '$POSTGRES_PROD_PASSWORD';
EOSQL

# echo 'Initializing database for Thingsboard and spotlight - new image'
psql -v ON_ERROR_STOP=1 -h localhost -p 5432 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  --DROP DATABASE $APP_DB_NAME;
  --CREATE USER $APP_DB_USER WITH SUPERUSER PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $POSTGRES_USER;
  ALTER USER $POSTGRES_USER with SUPERUSER;
  ALTER USER $APP_DB_USER with SUPERUSER;
  \connect $APP_DB_NAME $APP_DB_USER
  SELECT * from pg_hba_file_rules WHERE type = 'host' and address = '127.0.0.1';
  ALTER SYSTEM SET max_connections = 200;
  ALTER SYSTEM SET shared_buffers = '1GB';
  ALTER SYSTEM SET effective_cache_size = '3GB';
  ALTER SYSTEM SET maintenance_work_mem = '256MB';
  ALTER SYSTEM SET checkpoint_completion_target = 0.9;
  ALTER SYSTEM SET wal_buffers = '16MB';
  ALTER SYSTEM SET default_statistics_target = 100;
  ALTER SYSTEM SET random_page_cost = 1.1;
  ALTER SYSTEM SET effective_io_concurrency = 200;
  ALTER SYSTEM SET work_mem = '2621kB';
  ALTER SYSTEM SET huge_pages = off;
  ALTER SYSTEM SET min_wal_size = '1GB';
  ALTER SYSTEM SET max_wal_size = '4GB';
EOSQL

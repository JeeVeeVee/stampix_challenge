import knex from 'knex';

let knexInstance;

async function initializeData() {
  const knexOptions = {
    client: 'sqlite3',
    connection: {
      filename: 'src/db.sqlite',
    },
  };
  knexInstance = knex(knexOptions);

  try {
    await knexInstance.destroy();

    knexOptions.connection.database = 'user';
    knexInstance = knex(knexOptions);
    await knexInstance.raw('SELECT 1+1 AS result');
    console.log('database-connection established');
  } catch (error) {
    console.error('something went wrong');
    throw new Error('Could not initialize the data layer');
  }
  return knexInstance;
}

async function shutdownData() {
  await knexInstance.destroy();
  knexInstance = null;
}

function getKnex() {
  if (!knexInstance)
    throw new Error(
      'Please initialize the data layer before getting the Knex instance'
    );
  return knexInstance;
}

const tables = {
  user: 'user',
};

export const Knex = {
  tables,
  getKnex,
  initializeData,
  shutdownData,
};

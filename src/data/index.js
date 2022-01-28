import knex from 'knex';

let knexInstance;

/**
 * zorgt ervoor dat de verbinding met de database wordt geinitialiseerd
 * @returns {Promise<Knex<any, any[]>>} geeft de knexInstance terug die de repositories kunnen gebruiken om data op te halen
 */
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

/**
 * sluit de connectie met de database af
 * @returns {Promise<void>}
 */
async function shutdownData() {
  await knexInstance.destroy();
  knexInstance = null;
}

/**
 * functie die de repositories gebruiken om de knexInstance aan te spreken
 * @returns de knexInstance, als die bestaat
 * @throws  error indien de knexInstance nog niet is geinitialiseerd (initizalizeData() niet is opgeroepen)
 */
function getKnex() {
  if (!knexInstance)
    throw new Error(
      'Please initialize the data layer before getting the Knex instance'
    );
  return knexInstance;
}

/**
 * alle tables die aanwezig zijn in de database
 * @type {{user: string}}
 */
const tables = {
  user: 'user',
};

export const Knex = {
  tables,
  getKnex,
  initializeData,
  shutdownData,
};

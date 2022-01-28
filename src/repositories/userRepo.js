import { Knex } from '../data/index.js';


/**
 * haalt alle users op uit de database
 * @returns {Promise<*>} array met daarin alle users
 */
const findAllUsers = async () => {
  const output = await Knex.getKnex()(Knex.tables.user).select();
  return output;
};

/**
 * haalt alle users op die firstname als voornaam hebben, dit kunnen er meerdere zijn!
 * @param firstname   naam waarop gezocht moet worden
 * @returns {Promise<awaited boolean | Knex.QueryBuilder<TRecord, TResult>>}
 */
const findByFirstName = async (firstname) => {
  const output = await Knex.getKnex()(Knex.tables.user)
    .select()
    .where('first_name', firstname);
  return output;
};

/**
 * creeert een nieuwe user, en voegt die toe aan de database, genereert de velden created_at en modified_at
 * @param gender
 * @param firstname
 * @param lastname
 * @param email
 * @param phone_number
 * @param date_of_birth
 * @param language
 * @returns {Promise<awaited boolean | Knex.QueryBuilder<TRecord, TResult>>}
 * @throws error als er al een user met hetzelfde emailadress in de database zit
 */
const create = async (
  gender,
  firstname,
  lastname,
  email,
  phone_number,
  date_of_birth,
  language
) => {
  try {
    const date = new Date();
    const dateFormatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    await Knex.getKnex()(Knex.tables.user).insert({
      gender: gender,
      first_name: firstname,
      last_name: lastname,
      email: email,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      language: language,
      created_at: dateFormatted,
      modified_at: dateFormatted,
    });
  } catch (error) {
    console.log('something went wrong while inserting new user');
    console.log(error.message);
    throw error;
  }
  return await Knex.getKnex()(Knex.tables.user).select().where('email', email);
};

export const userRepo = {
  findAllUsers,
  findByFirstName,
  create,
};

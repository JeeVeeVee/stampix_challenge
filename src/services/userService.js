import { userRepo } from '../repositories/userRepo.js';

/**
 * vraagt aan de repo om alle users op te halen
 * @returns {Promise<*>}
 */
let getAll = async () => {
  return await userRepo.findAllUsers();
};

/**
 * vraagt aan de repo om alle gebruiker met als voornaam firstname op te halen
 * @param firstname
 * @returns {Promise<boolean|Knex.QueryBuilder<TRecord, TResult>>}
 */
let getByFirstName = async (firstname) => {
  return await userRepo.findByFirstName(firstname);
};

/**
 * vraagt aan de repo om een nieuwe gebruiker aan te maken
 * @param gender
 * @param first_name
 * @param last_name
 * @param email
 * @param phone_number
 * @param date_of_birth
 * @param language
 * @returns {Promise<boolean|Knex.QueryBuilder<TRecord, TResult>>}
 */
let create = async ({
  gender,
  first_name,
  last_name,
  email,
  phone_number,
  date_of_birth,
  language,
}) => {
  return await userRepo.create(
    gender,
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    language
  );
};

export let userService = {
  getAll,
  getByFirstName,
  create,
};

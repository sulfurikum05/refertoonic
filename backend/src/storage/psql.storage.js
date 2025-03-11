
import { Model } from 'objection';
import knex from 'knex';
import knexConfigs from '../../knex.configs';


class PSQLStorage {
  static async init() {
    try {
      const options = process.env.NODE_ENV === 'production'
        ? knexConfigs.production
        : knexConfigs.development;
      const pg = knex(options);
      await pg.raw('SELECT 1;');
      Model.knex(pg);
      PSQLStorage.knex = pg;
      console.info('PSQL Connected...');
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = PSQLStorage;

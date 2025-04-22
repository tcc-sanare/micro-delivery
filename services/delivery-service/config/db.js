const knex = require('knex');

const db = knex({
  client: 'mysql2',
  version: '5.7',
  connection: {
    host: 'interchange.proxy.rlwy.net',
    port: 20597,
    user: 'root',
    password: 'GbpORHuRYycVsokIwqtZmGxBpedKtzJc',
    database: 'railway',
  },
});

module.exports = db;
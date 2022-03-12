require("dotenv").config()
//  require("dotenv").config({
//    path: `.env.${process.env.NODE_ENV}`,
//  })

console.log(`knex file ${process.env.NODE_ENV} dir name ${__dirname}`)
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  staging: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      port : process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      port : process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      port : process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  } 

};

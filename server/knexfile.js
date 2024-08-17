module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'labodbdev',
        port: process.env.DB_PORT || 5432
      },
      migrations: {
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  };
  
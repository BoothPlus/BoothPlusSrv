import mysql from 'mysql2/promise'

class DbConnection {
  constructor () {
    const dbInfo = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    }

    this.Connection = mysql.createConnection(dbInfo)
  }
}

export default DbConnection = new DbConnection()

import oracleDB from 'oracledb'

class DbConnection {
  constructor () {
    const dbInfo = {
      user: process.env.ORACLEUSER,
      password: process.env.ORACLEPASSWORD,
      connectString: process.env.CONNECTIONSTRING,
    }

    oracleDB.autoCommit = true
    oracleDB.outFormat = oracleDB.OBJECT
    // oracleDB.initOracleClient({ libDir: '../../instantclient_21_10' })

    // oracleDB.getConnection(dbInfo, (error, connection) => {
    //   if (error) throw error
    //
    //   console.log('Oracle DB Connected')
    //   this.Connection = connection
    // })

    this.Connection = oracleDB.getConnection(dbInfo)
  }
}

export default DbConnection = new DbConnection()

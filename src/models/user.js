import dbConnection from '../config/dbConnection.js'

const connection = await dbConnection.Connection
const User = {}

User.AddUser = async (userEntity) => {
  const { userId, name, email, profileImage } = userEntity

  const searchUserSql = 'SELECT COUNT(1) AS COUNT FROM USERS WHERE USER_ID = ?'
  const [rows, fields] = await connection.execute(searchUserSql, [userId])

  if (rows[0]['COUNT'] === 0) {
    const addUserSql = 'INSERT INTO USERS (USER_ID, NAME, EMAIL, PROFILE_IMAGE) VALUES (?, ?, ?, ?)'
    await connection.execute(addUserSql, [userId, name, email, profileImage])
  }
}

export default User
import dbConnection from '../config/dbConnection.js'

const connection = await dbConnection()
const User = {}

User.IsExists = async (userId) => {
  const sql = 'SELECT COUNT(1) AS COUNT FROM USERS WHERE USER_ID = ?'

  return await connection.execute(sql, [userId])
}

User.AddUser = async (userEntity) => {
  const { userId, name, email, profileImage } = userEntity

  const addUserSql = 'INSERT INTO USERS (USER_ID, NAME, EMAIL, PROFILE_IMAGE) VALUES (?, ?, ?, ?)'

  await connection.execute(addUserSql, [userId, name, email, profileImage])
}

export default User

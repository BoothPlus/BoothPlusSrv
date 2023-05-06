import dbConnection from '../config/dbConnection.js'

const connection = await dbConnection.Connection
const User = {}

User.AddUser = async (userEntity) => {
  const { userId, name, email, profileImage } = userEntity

  const searchUserSql = 'SELECT COUNT(1) AS COUNT FROM USERS WHERE USER_ID = :USER_ID'
  const result = await connection.execute(searchUserSql, [userId])

  if (!!result.rows[0]['COUNT']) console.log('????')

  const addUserSql = 'INSERT INTO USERS (USER_ID, NAME, EMAIL, PROFILE_IMAGE) VALUES (:USER_ID, :NAME, :EMAIL, :PROFILE_IMAGES)'
  await connection.execute(addUserSql, [userId, name, email, profileImage])
}

export default User
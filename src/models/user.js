import dbConnection from '../config/dbConnection.js'

const connection = await dbConnection()
const User = {}

User.IsExists = async (userId) => {
  try {
    const sql = 'SELECT COUNT(1) AS COUNT FROM USERS WHERE USER_ID = ?'

    return await connection.execute(sql, [userId])
  } catch (e) {
    console.error(e)
  }
}

User.AddUser = async (userEntity) => {
  try {
    const { userId, name, email, profileImage } = userEntity

    const addUserSql = 'INSERT INTO USERS (USER_ID, NAME, EMAIL, PROFILE_IMAGE) VALUES (?, ?, ?, ?)'

    await connection.execute(addUserSql, [userId, name, email, profileImage])
  } catch (e) {
    console.error(e)
  }
}

User.GetUserByUserId = async (uuid) => {
  try {
    const sql = `SELECT id,
                        USER_ID AS userId,
                        NAME AS name,
                        EMAIL AS email,
                        PROFILE_IMAGE AS profileImage,
                        CREATED_DATE AS createdDate
                        FROM USERS
                        WHERE USER_ID = ?`
    const [row] = await connection.execute(sql, [uuid])
    return row[0]
  } catch (e) {
    console.error(e)
  }
}

export default User

import dbConnection from '../config/dbConnection.js'
import dayjs from 'dayjs'

dayjs.locale('kr')
const connection = await dbConnection.Connection
const POST = {}

POST.GetCount = async (options) => {
  const sql = `SELECT COUNT(1) AS COUNT FROM POSTS WHERE ITEM_ID = ?`
  const [rows, fields] = await connection.execute(sql, [options.itemId])
  return rows[0]['COUNT']
}

POST.GetPost = async (options) => {
  const itemId = options.itemId
  const page = parseInt(options.page)
  const pageSize = parseInt(options.pageSize)

  const sql = `SELECT p.COMMENT,
                      p.RATING,
                      p.CREATED_DATE,
                      u.NAME,
                      u.PROFILE_IMAGE
               FROM POSTS p
               JOIN USERS u ON p.CREATOR = u.USER_ID
               WHERE ITEM_ID = ?
               ORDER BY p.CREATED_DATE DESC
               LIMIT ? OFFSET ?`

  const [rows, fields] = await connection.execute(sql, [itemId, pageSize, ((page - 1) * pageSize)])
  return rows
}

POST.AddPost = async (post) => {
  const { itemId, comment, rating, id } = post
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const sql = 'INSERT INTO POSTS (ITEM_ID, COMMENT, RATING, CREATED_DATE, CREATOR, MODIFIED_DATE, MODIFIER) VALUE (?, ?, ?, ?, ?, ?, ?)'

  await connection.execute(sql, [itemId, comment, rating, now, id, now, id])
}

export default POST

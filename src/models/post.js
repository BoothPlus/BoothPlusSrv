import dbConnection from '../config/dbConnection.js'
import dayjs from 'dayjs'

dayjs.locale('kr')
const connection = await dbConnection.Connection
const POST = {}

POST.GetPost = async (options) => {
  const itemId = options.itemId
  const page = parseInt(options.page)
  const pageSize = parseInt(options.pageSize)

  const sql = `SELECT * FROM POSTS WHERE ITEM_ID = ? LIMIT ? OFFSET ?`
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

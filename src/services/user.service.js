import User from '../models/user.js'

const UserService = {}

UserService.IsUserExists = async (userId) => {
  return await User.IsExists(userId)
}

UserService.AddUser = async (userEntity) => {
  const { userId } = userEntity
  const [rows, fields] = await User.IsExists(userId)
  if (rows[0]['COUNT'] === 0) await User.AddUser(userEntity)
}

export default UserService
const TokenHelper = async (req) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    return bearer[1]
  }

  return ''
}

export default TokenHelper
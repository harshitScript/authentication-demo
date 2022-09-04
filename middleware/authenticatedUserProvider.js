const User = require('../models/Users')

const authenticatedUserProvider = (req, res, next) => {
  const userId = req?.session?.userId

  if (!userId) {
    req.user = null
    req.isAuthenticated = false
    return next()
  }

  User.findById(userId).then((user) => {
    if (!user) {
      req.user = null
      req.isAuthenticated = false
      return next()
    }
    req.user = user
    req.isAuthenticated = true
    return next()
  })
}

module.exports = authenticatedUserProvider

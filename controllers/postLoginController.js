const Users = require('../models/Users')
const { failureCallback, generateHashedPassword } = require('../utils/helper')

const postLoginController = (req, res) => {
  const { email, password } = req.body

  const hashedPassword = generateHashedPassword({ password })

  Users.findOne({ email, password: hashedPassword })
    .then((user) => {
      if (!user) {
        req.flash('error', 'User not found.')
        return res.redirect('/login')
      }

      req.session.userId = user?._id
      req.session.save((err) => {
        if (err) {
          req.flash('error', 'Error occurred while creating session.')
          return res.redirect('/login')
        }
        return res.redirect('/home')
      })
    })
    .catch(failureCallback)
}
module.exports = postLoginController

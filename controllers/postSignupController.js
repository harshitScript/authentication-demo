const Users = require('../models/Users')
const { failureCallback, generateHashedPassword } = require('../utils/helper')

const postSignUpController = (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    req.flash('error', 'Password and Confirm password not matched.')
    return res.redirect('/sign-up')
  }

  const hashedPassword = generateHashedPassword({ password })

  const successCallback = () => {
    req.flash('success', 'User creation successful.')
    return res.redirect('/login')
  }

  const user = new Users({ name, email, password: hashedPassword })

  user.save().then(successCallback).catch(failureCallback)
}
module.exports = postSignUpController

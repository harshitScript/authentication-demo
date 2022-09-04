const { Router } = require('express')
const { urlencoded } = require('body-parser')
const getHomeController = require('../controllers/getHomeController')
const getLoginFormController = require('../controllers/getLoginFormController')
const getSignUpFormController = require('../controllers/getSignUpFormController')
const postSignUpController = require('../controllers/postSignupController')
const postLoginController = require('../controllers/postLoginController')
const isAuth = require('../middleware/isAuth')

const appRoutes = Router()

appRoutes.get('/login', getLoginFormController)
appRoutes.post('/login', urlencoded({ extended: false }), postLoginController)

appRoutes.get('/sign-up', getSignUpFormController)
appRoutes.post(
  '/sign-up',
  urlencoded({ extended: false }),
  postSignUpController
)

appRoutes.get('/home', isAuth, getHomeController)

appRoutes.use((req, res) => {
  return res.send('Page not Found.')
})

module.exports = appRoutes

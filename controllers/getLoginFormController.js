const getLoginFormController = (req, res, next) => {
  return res.render('login-form', {
    docTitle: 'Login page',
    errorMessage: req.flash('error')[0],
    successMessage: req.flash('success')[0]
  })
}

module.exports = getLoginFormController

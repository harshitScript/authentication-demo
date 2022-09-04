const getSignUpFormController = (req, res) => {
  return res.render('sign-up-form', {
    docTitle: 'Sign up user',
    errorMessage: req.flash('error')[0],
    successMessage: req.flash('success')[0]
  })
}

module.exports = getSignUpFormController

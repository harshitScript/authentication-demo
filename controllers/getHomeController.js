const getHomeController = (req, res, next) => {
  return res.render('home', {
    docTitle: 'Home'
  })
}

module.exports = getHomeController

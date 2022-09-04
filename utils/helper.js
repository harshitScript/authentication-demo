const { createHmac } = require('crypto')

const failureCallback = (error) => {
  console.log('The error is : ', error)
}

const generateHashedPassword = ({ algorithm = 'sha512', password = '' }) => {
  return createHmac(algorithm, process.env.SECRET)
    .update(password)
    .digest('hex')
}

module.exports = {
  failureCallback,
  generateHashedPassword
}

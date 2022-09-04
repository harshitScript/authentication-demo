const { connect } = require('mongoose')

const connectMongoDb = () => {
  return connect(process.env.MONGO_URI)
}

module.exports = { connectMongoDb }

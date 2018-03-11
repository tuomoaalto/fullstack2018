if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

port = process.env.PORT
let user = process.env.MLAB_FULLSTACK_USER
let pass = process.env.MLAB_FULLSTACK_PASS
let dburl = process.env.MLAB_FULLSTACK_URL
let mongoUrl = 'mongodb://' + user + ':' + pass + '@' + dburl

if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    user = process.env.MLAB_FULLSTACK_TEST_USER
    pass = process.env.MLAB_FULLSTACK_TEST_PASS
    dburl = process.env.MLAB_FULLSTACK_TEST_URL
    mongoUrl = 'mongodb://' + user + ':' + pass + '@' + dburl
}
  
  module.exports = {
    mongoUrl,
    port
  }
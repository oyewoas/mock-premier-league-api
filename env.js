module.exports = {
    mongodb_url : process.env.MONGODB_URL,
    secret: process.env.SECRET,
    port : process.env.PORT || 4000,
    environment : process.env.NODE_ENV,
    redis_url : process.env.REDIS_URL,
    test_mongodb_url : process.env.TEST_MONGODB_URL,

}


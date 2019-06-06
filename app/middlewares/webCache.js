const redis = require("redis");
const url = require('url');
const env = require('../../env')
// const redisURL = url.parse(env.redis_url);
// const client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// client.auth(redisURL.auth.split(":")[1]);
const client = redis.createClient();

let redisWebCache = (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;

    client.get(key, function(err, reply) {
        if (reply) {
            res.send(reply);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = body => {
                client.set(key, JSON.stringify(body));
                res.sendResponse(body);
            };
            next();
        }
    });
};

module.exports = {
    redisWebCache
}

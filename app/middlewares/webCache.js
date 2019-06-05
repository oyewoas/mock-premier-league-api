const redis = require("redis");

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

dbPassword = "mongodb://rishi:rishi@cluster0-shard-00-00-zdq0e.mongodb.net:27017,cluster0-shard-00-01-zdq0e.mongodb.net:27017,cluster0-shard-00-02-zdq0e.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = {
    mongoURI: dbPassword
};

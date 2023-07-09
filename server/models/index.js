const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, {
  // keepAlive: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

module.exports.User = require("./user");
module.exports.Item = require("./item");
module.exports.Cart = require("./cart");

var conf = require("./config"),
    express = require("express"),
    app = express();

app.listen(conf.devport, function() {
  console.log("Express server is running on localhost: " + conf.devport);
});

const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

app.get('/', (req,res) => res.render('home.ejs'));

io.on("connection", socket => {
  console.log("New connection: " + socket.id);
});

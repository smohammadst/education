const Server = require('./app/server');
require("dotenv").config();
const DB_URL = "mongodb://127.0.0.1:27017/shope";
new Server(3000);

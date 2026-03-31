const express = require('express')
require("dotenv").config()
const app = express()
const port = process.env.PORT
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const database = require("./config/database")

const systemConfig = require("./config/system")

database.connect()

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static("public"))
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// Flash
app.use(cookieParser("JHGJKLKLGLFJJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

// Routes
route(app)
routeAdmin(app)

app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

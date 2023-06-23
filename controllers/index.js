const homeRoutes = require("./homeRoutes")
const apiRoutes = require("./api/index")
const app = require("express").Router()

app.use(homeRoutes)
app.use("/api",apiRoutes)

module.exports = app;
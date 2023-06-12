const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const htmlRoutes = require("./controllers/homeRoutes")
const routes = require('./controllers/api');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3006;

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(htmlRoutes)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
}); 
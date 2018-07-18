const app = require('express')(),
    bodyParser = require('body-parser'),
    apiRoutes = require('./routes/api'),
    config = require('./config').app;

// Configure app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuring application routes
app.use('/api/v1', apiRoutes);

app.listen(config.port);
console.log(`App running on port: ${config.port}`);
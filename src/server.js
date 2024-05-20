const migrationsRun = require('./sqlite/migrations/index')
const express = require('express')
const routes = require('./routes/users.routes')

const app = express();
app.use(express.json());
app.use(routes);
migrationsRun();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
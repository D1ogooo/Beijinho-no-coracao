const { Router } = require('express')
const UsersController = require('../controllers/usersController')

const routes = Router()

const usersController = new UsersController();

routes.post('/users', usersController.create);
routes.get('/users/list', usersController.show);

module.exports = routes;
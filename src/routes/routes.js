const { Router } = require('express');
const { authHandler } = require('../middlewares/authHandler');
const { userController } = require('../controllers/userController');
const { todoController } = require('../controllers/todoController');

const routes = Router();
const authRoutes = Router(); //router for authenticated endpoints

routes.post('/register', userController.register.bind(this));
routes.post('/login', userController.login.bind(this));

//add auth verification
authRoutes.use(authHandler);


//todo routes
authRoutes.get('/todos', todoController.list.bind(this));
authRoutes.post('/todos', todoController.create.bind(this));
authRoutes.put('/todos/:id', todoController.update.bind(this));
authRoutes.delete('/todos/:id', todoController.delete.bind(this));

routes.use(authRoutes);

module.exports = { routes };
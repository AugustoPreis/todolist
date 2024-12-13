const { StatusCodes } = require('http-status-codes');
const { todoService } = require('../services/todoService');

class TodoController {

  async list(req, res, next) {
    try {
      const todos = await todoService.list(req.query, req.user);

      res.status(StatusCodes.OK).json(todos);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const createdTodo = await todoService.create(req.body, req.user);

      res.status(StatusCodes.CREATED).json(createdTodo);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const todo = req.body;

      todo.id = Number(req.params.id);

      const updatedTodo = await todoService.update(todo, req.user);

      res.status(StatusCodes.OK).json(updatedTodo);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await todoService.delete(Number(id), req.user);

      res.status(StatusCodes.NO_CONTENT).json({});
    } catch (err) {
      next(err);
    }
  }
}

const todoController = new TodoController();

module.exports = { todoController, TodoController };
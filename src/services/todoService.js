const { StatusCodes } = require('http-status-codes');
const { todoRepository } = require('../repositories/todoRepository');
const { Todo } = require('../models/Todo');
const { RequestError } = require('../utils/RequestError');
const { isString, isValidString, isValidNumber } = require('../utils/validators');

class TodoService {
  async list(params) {
    const { page, limit } = params;
    const pagination = {
      page: Number(page),
      limit: Number(limit),
    }

    if (!isValidNumber(pagination.page)) {
      pagination.page = 1;
    }

    if (!isValidNumber(pagination.limit)) {
      pagination.limit = 10;
    }

    const { rows, count } = await todoRepository.find({ pagination });

    const data = rows.map((todo) => todo.toJSON());

    return { data, count, ...pagination };
  }

  async findOneById(id) {
    if (!isValidNumber(id)) {
      throw new RequestError('ID not found', StatusCodes.BAD_REQUEST);
    }

    const todoModel = await todoRepository.findOne({ id });

    if (!todoModel) {
      throw new RequestError('TODO not found', StatusCodes.NOT_FOUND);
    }

    return todoModel;
  }

  async create(todoData, user) {
    const { title, description } = todoData;

    if (!isValidString(title, { minLength: 1, maxLength: 50 })) {
      throw new RequestError('Invalid title, must contain between 1 and 50 characters', StatusCodes.BAD_REQUEST);
    }

    if (isString(description) && !isValidString(description, { maxLength: 250 })) {
      throw new RequestError('Invalid description, must contain a maximum of 250 characters', StatusCodes.BAD_REQUEST);
    }

    const todoModel = new Todo();

    todoModel.set('title', title.trim());
    todoModel.set('description', description);
    todoModel.set('user_id', user.id);

    await todoModel.save();

    const result = todoModel.toJSON();

    delete result.user_id;

    return result;
  }

  async update(todoData, user) {
    const { id, title, description } = todoData;

    if (!isValidNumber(id)) {
      throw new RequestError('ID not found', StatusCodes.BAD_REQUEST);
    }

    if (!isValidString(title, { minLength: 1, maxLength: 50 })) {
      throw new RequestError('Invalid title, must contain between 1 and 50 characters', StatusCodes.BAD_REQUEST);
    }

    if (isString(description) && !isValidString(description, { maxLength: 250 })) {
      throw new RequestError('Invalid description, must contain a maximum of 250 characters', StatusCodes.BAD_REQUEST);
    }

    const todoModel = await todoRepository.findOne({ id });

    if (!todoModel) {
      throw new RequestError('TODO not found', StatusCodes.NOT_FOUND);
    }

    if (todoModel.user.id != user.id) {
      throw new RequestError(`This todo belongs to ${todoModel.user.name}`, StatusCodes.FORBIDDEN);
    }

    todoModel.set('title', title.trim());
    todoModel.set('description', description);

    await todoModel.save();

    const result = todoModel.toJSON();

    delete result.user;

    return result;
  }

  async delete(id, user) {
    if (!isValidNumber(id)) {
      throw new RequestError('ID not found', StatusCodes.BAD_REQUEST);
    }

    const todoModel = await this.findOneById(id);

    if (todoModel.user.id != user.id) {
      throw new RequestError(`This todo belongs to ${todoModel.user.name}`, StatusCodes.FORBIDDEN);
    }

    await todoModel.destroy();
  }
}

const todoService = new TodoService();

module.exports = { todoService, TodoService };
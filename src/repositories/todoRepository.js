const { Todo } = require('../models/Todo');
const { User } = require('../models/User');

class TodoRepository {
  async find(params) {
    const { page, limit } = params.pagination;

    return await Todo.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['id', 'ASC']],
    });
  }

  async findOne(where) {
    return await Todo.findOne({
      where,
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
  }
}

const todoRepository = new TodoRepository();

module.exports = { todoRepository, TodoRepository };
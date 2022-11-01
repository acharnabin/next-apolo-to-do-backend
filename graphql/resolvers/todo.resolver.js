const todoController = require("../../controllers/todo/todo.controller");

exports.todoResolver = {
  //save todo
  async saveTodo(root, args, context) {
    try {
      let res = await todoController.saveTodo(args);
      return res;
    } catch (error) {
      throw error;
    }
  },

  // delete todo
  async deleteTodo(root, args, context) {
    try {
      let res = await todoController.deleteTodo(
        args?.id,
        "6356ce22cd36179b9d4c1fff"
      );
      return res;
    } catch (error) {
      throw error;
    }
  },

  //UPDATE todo
  async updateTodo(root, args, context) {
    try {
      let res = await todoController.editTodo(
        args?.input,
        "6356ce22cd36179b9d4c1fff"
      );
      return res;
    } catch (error) {
      throw error;
    }
  },

    // fetch today todo
    async fetchTodayTodo(root, args, context) {
        try {
          let res = await todoController.fetchTodayTodo("6356ce22cd36179b9d4c1fff");
          return res;
        } catch (error) {
          throw error;
        }
      },

  // fetch history
  async fetchHistory(root, args, context) {
    try {
      let res = await todoController.fetchHistory("6356ce22cd36179b9d4c1fff");
      return res;
    } catch (error) {
      throw error;
    }
  },
};

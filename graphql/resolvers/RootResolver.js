const { todoResolver } = require("./todo.resolver");
const { userResolvers } = require("./user.resolver");

const { createUser, checkOtpAndSignUp, LoginRequest } = userResolvers;
const { saveTodo, deleteTodo,updateTodo,fetchHistory,fetchTodayTodo } = todoResolver;

const RootResolver = {
  Query: {
    LoginRequest,
    deleteTodo,
    fetchHistory,
    fetchTodayTodo
  },

  Mutation: {
    createUser,
    checkOtpAndSignUp,
    saveTodo,
    updateTodo
  },
};

module.exports = RootResolver;

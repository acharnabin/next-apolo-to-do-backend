const { ApolloError } = require("apollo-server-express");
const { Schema, Mongoose, default: mongoose } = require("mongoose");
const Err_msg = require("../../JSON/Error/Error.msg");
const mongooseLib = require("../../lib/mongoose.lib");
const todoModel = require("../../model/todo.model");
const moment = require("moment");

class _todo {
  async saveTodo(args) {
    let { title, index, scheduleAt } = args.input;

    let _todo = new todoModel({
      title,
      index,
      scheduleAt,
      userId: "6356ce22cd36179b9d4c1fff",
    });
    let newTodo = await _todo.save();

    return newTodo;
  }

  //delete todo
  // check the current user with login user
  // if current user id === creator id then delete the todo
  async deleteTodo(id, userId) {
    let find_By_id = await todoModel.findById(id);

    if (find_By_id === null) {
      throw new ApolloError(Err_msg.ITEM_NOT_FOUND);
    }

    let checkOwnerID = find_By_id?.userId?.equals(
      mongoose.Types.ObjectId(userId)
    );

    if (!checkOwnerID) {
      throw new ApolloError(Err_msg.CANT_DELETE_TODO);
    }

    //delete the todo
    let _delete = await todoModel.findByIdAndDelete(id);

    return _delete;
  }

  // edit todo
  async editTodo(args, userId) {
    let find_By_id = await todoModel.findById(args?._id);

    if (find_By_id === null) {
      throw new ApolloError(Err_msg.ITEM_NOT_FOUND);
    }

    let checkOwnerID = find_By_id?.userId?.equals(
      mongoose.Types.ObjectId(userId)
    );

    if (!checkOwnerID) {
      throw new ApolloError(Err_msg.CANT_DELETE_TODO);
    }

    //delete the todo
    let _update = await todoModel.findByIdAndUpdate(args?._id, args);

    return _update;
  }

  // fetch todo with pagination , sort by index
  async fetchTodayTodo(userId) {
    let _userId = mongoose.Types.ObjectId(userId);
    let findAndSortByIndex = await todoModel
      .find({ userId: _userId })
      .sort({ index: 1 });
    return findAndSortByIndex;
  }

  //fetch upcming todo
  async fetchUpcomingTodo(args, userId) {
    // fetch upcoming to do
  }

  //fetch history
  async fetchHistory(userId) {
    let currentDate = moment().toISOString();
    let _userId = mongoose.Types.ObjectId(userId);
    let findAndSortByDate = await todoModel
      .find({
        $or: [{ userId: _userId }],
      })
      .sort({
        scheduleAt: 1,
      });

    console.log(findAndSortByDate, "currentDate");
    return "currentDate";
  }
}

let todoController = new _todo();
module.exports = todoController;

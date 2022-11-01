const { ApolloError } = require("apollo-server-express");
const validator = require("validator");
const Err_msg = require("../../JSON/Error/Error.msg");

class _Validation {
  // check is email or not
  isEmail(email) {
    try {
      return validator.isEmail(email);
    } catch (error) {
      throw new ApolloError(Err_msg.SOMETHING_WENT_WRONG);
    }
  }

  isEmpty(str) {
    try {
      return validator.isEmpty(str);
    } catch (error) {
      throw new ApolloError(Err_msg.SOMETHING_WENT_WRONG);
    }
  }
}
const validation = new _Validation();
module.exports = validation;

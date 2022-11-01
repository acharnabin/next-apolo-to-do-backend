const { ApolloError } = require("apollo-server-express");
const UserClass = require("../../controllers/user/user.controller");
const Err_msg = require("../../JSON/Error/Error.msg");
const ERR_TYPE = require("../../JSON/Error/Error.type");
const validation = require("../../middlewares/validation/vallidation");

exports.userResolvers = {
  createUser: async (root, args) => {
    if (!validation.isEmail(args?.input?.email)) {
      throw new ApolloError(Err_msg.BAD_EMAIL_FORMAT);
    }

    //
    let checkEmailExist = await UserClass.checkEmailExist(args.input.email);
    if (checkEmailExist) throw new ApolloError(Err_msg.USER_EMAIL_EXIST);

    let checkUsernameExist = await UserClass.checkUsernameExist(
      args.input.username
    );
    if (checkUsernameExist) throw new ApolloError(Err_msg.USERNAME_EXIST);

    let res = await UserClass.AddUser(args);
    return res;
  },

  checkOtpAndSignUp: async (root, args) => {
    try {
      let checkEmailExist = await UserClass.checkEmailExist(args.email);
      if (!checkEmailExist) {
        throw new ApolloError(Err_msg.USER_EMAIL_NOT_EXIST);
      }
      let res = await UserClass.checkOtp(args.email, args.otp,"signup");

      return res;
    } catch (error) {
      throw new ApolloError(error);
    }
  },

  //login request
  LoginRequest: async (root, args) => {
    try {
      // checking the email exist or not
      let checkEmailExist = await UserClass.checkEmailExist(args.email);
      if (!checkEmailExist) {
        throw new ApolloError(Err_msg.USER_EMAIL_NOT_EXIST);
      }

      let res = await UserClass.loginRequest(args.email);
      return res;
    } catch (error) {
      throw error;
    }
  },

  //check otp and login
  checkOtpAndLogin: async (root, args) => {
    try {
      let checkEmailExist = await UserClass.checkEmailExist(args.email);
      if (!checkEmailExist) {
        throw new ApolloError(Err_msg.USER_EMAIL_NOT_EXIST);
      }
      let res = await UserClass.checkOtp(args.email, args.otp,"login");

      return res;
    } catch (error) {
      throw new ApolloError(error);
    }
  },

  

};

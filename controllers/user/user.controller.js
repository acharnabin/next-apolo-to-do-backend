const common = require("../../lib/common.lib");
const momentLib = require("../../lib/moment.lib");
const UserModel = require("../../model/user.model");
const moment = require("moment/moment");
const { ApolloError } = require("apollo-server-express");
const Err_msg = require("../../JSON/Error/Error.msg");
var jwt = require("jsonwebtoken");
const tokenLib = require("../../lib/token.lib");

class User_Class {
  // sign up new user
  async AddUser(args) {
    try {
      const { input } = args;

      const _user = new UserModel({
        ...input,
        otp: common.generateRandomOtp(),
      });

      const user = await _user.save();

      return { user };
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  /**
   *
   * @param {*} email
   * @returns true/false
   */
  // check email exist or not
  async checkEmailExist(email) {
    try {
      const find_user = await UserModel.find({
        email,
      });

      return find_user?.length > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }

  //
  /**
   *
   * @param {*} username
   * @returns {*} true/false
   */
  async checkUsernameExist(username) {
    try {
      const find_user = await UserModel.find({
        username,
      });

      return find_user?.length > 0 ? true : false;
    } catch (error) {
      throw error;
    }
  }

  //check otp
  //type= signup => find user and  update and send token
  //type login => fn dthe user and send token , skip the update
  async checkOtp(email, otp, type) {
    try {
      const find_user = await UserModel.findOne({ email });

      let current_time = moment();
      let add_10min = moment(find_user?.otp_generate_time)?.add(10, "minute");

      if (parseInt(otp) !== parseInt(find_user?.otp)) {
        throw new ApolloError(Err_msg.OTP_MISMATCH);
      }

      //check otp expired or not;
      //if expire time + 10 === current time => otp not expired
      //else otp expired
      if (!moment(current_time).isSameOrBefore(add_10min)) {
        throw new ApolloError(Err_msg.OTP_EXPIRE);
      }

      // after sucess otp update user isRegistrationComplete =true
      if (type === "signup") {
        const updateUser = await UserModel.findOneAndUpdate(
          { email },
          { isRegistrationComplete: true }
        );
      }

      // generate jwt token
      let data = {
        _id: find_user._id,
        username: find_user?.username,
        email: find_user?.email,
      };
      let token = tokenLib.generateToken(data);

      return token;
    } catch (error) {
      throw error;
    }
  }

  // login requst , take email send otp
  async loginRequest(email) {
    try {
      // find the user by email
      // update the otp , otp_generate_time
      const update = await UserModel.findOneAndUpdate(
        { email },
        {
          otp: common.generateRandomOtp(),
          otp_generate_time: Date.now,
        }
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}

const UserClass = new User_Class();
module.exports = UserClass;

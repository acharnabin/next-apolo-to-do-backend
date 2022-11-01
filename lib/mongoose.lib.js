const { default: mongoose } = require("mongoose");

class _mongooseLib {
  async isValidMongoId(id) {
    let _valid = await mongoose.isValidObjectId(id);
    return _valid;
  }

  // convert to mongo id
  async convertToMongoId(id) {
    if (!this.isValidMongoId(id)) {
      let _id = await mongoose.Types.ObjectId(id);
      return _id;
    }

    return id;
  }

  //match both object id
  async matchObjectId(id1, id2) {
    //check type first , if type is not object id then convert it to monogo id then compare
    let _id1 = await this.convertToMongoId(id1);
    let _id2 = await this.convertToMongoId(id2);

    if (_id1 === _id2) {
      return true;
    }

    return false;
  }
}

const mongooseLib = new _mongooseLib();
module.exports = mongooseLib;

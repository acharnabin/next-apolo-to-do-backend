const moment = require("moment/moment");

class _momentLib {
  // @  add _afterTime to current time , and return the time in unix
  // _afterTime will pass as seconds
  returnTimeAfter(_afterTime) {
    let expireTime = moment().add(_afterTime, "second");
    return moment(expireTime).unix();
  }

  returnCurrentTime(){
    return moment().toISOString()
  }
}

const momentLib = new _momentLib();
module.exports = momentLib;

class commonLib {
  generateRandomOtp() {
    return Math.floor(100000 + Math.random() * 900000)
  }
}

const common = new commonLib();
module.exports = common;

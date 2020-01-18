const ENV = process.env.NODE_ENV || "development";

const devData = require("./development-data/index");
const testData = require("./test-data/index");

const data = {
  development: devData,
  test: testData,
  production: devData
};

module.exports = data[ENV];

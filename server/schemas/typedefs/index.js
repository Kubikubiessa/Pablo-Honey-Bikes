// Root Type Definitions in schema/typedefs/index.js

const { gql } = require("apollo-server-express");
const userTypeDefs = require("./user");
const productTypeDefs = require("./product");
const rentalTypeDefs = require("./rental");
const categoryTypeDefs = require("./category");
const orderTypeDefs = require("./order");
const authTypeDefs = require("./auth");

const rootTypeDefs = gql`
  ${userTypeDefs}
  ${productTypeDefs}
  ${rentalTypeDefs}
  ${categoryTypeDefs}
  ${orderTypeDefs}
  ${authTypeDefs}
 
`;

module.exports = rootTypeDefs;

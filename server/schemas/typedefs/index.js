// Root Type Definitions in schema/typedefs/index.js

const { gql } = require("apollo-server-express");
const userTypeDefs = require("./user");
const productTypeDefs = require("./product");
const brandTypeDefs = require("./brand");
const rentalTypeDefs = require("./rental");
const categoryTypeDefs = require("./category");
const orderTypeDefs = require("./order");
const authTypeDefs = require("./auth");


const rootTypeDefs = gql`
  ${userTypeDefs}
  ${productTypeDefs}
  ${brandTypeDefs}
  ${rentalTypeDefs}
  ${categoryTypeDefs}
  ${orderTypeDefs}
  ${authTypeDefs}
 
`;

module.exports = rootTypeDefs;

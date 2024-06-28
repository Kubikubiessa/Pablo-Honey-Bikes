// brand.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Brand {
    _id: ID!
    brandname: String!
    products: [Product!]!
    categories: [Category!]!
  }

  type Query {
    brand(_id: ID!): Brand
    brands: [Brand!]!
  }

  type Mutation {
    addBrand(
      brandname: String!
      categories: [ID]
    ): Brand!
    updateBrand(
      _id: ID!
      brandname: String
      products: [ID]
      categories: [ID]
    ): Brand!
    deleteBrand(_id: ID!): Brand
  }
`;

module.exports = typeDefs;

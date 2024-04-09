// Product Type Definitions product.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    _id: ID!
    productname: String
    price: Float!
    properties: [Property!]!
    category: Category!
  }

  type Property {
    key: String!
    value: String!
  }

  type Category {
    _id: ID!
    categoryname: String!
    products: [Product!]!
  }

  type Query {
    product(_id: ID!): Product
    products(category: ID): [Product!]!
  }

  type Mutation {
    addProduct(
      productname: String!
      price: Float!
      properties: [PropertyInput!]!
      category: ID!
    ): Product
    updateProduct(
      _id: ID!
      productname: String!
      price: Float!
      properties: [PropertyInput!]!
      category: ID
    ): Product!
   deleteProduct(_id: ID!): Product
  }

  input PropertyInput {
    key: String!
    value: String!
  }

 
`;

module.exports = typeDefs;

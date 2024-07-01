// Product Type Definitions product.js
const { gql } = require("apollo-server-express");
const typeDefs = gql`
type Property {
  key: String!
  value: String!
  type: String
  options: [String]
}

type Product {
  _id: ID!
  productname: String!
  description: String
  price: Float!
  imageUrl: String
  properties: [Property!]!
  category: Category!
  brand: Brand!
}

type Query {
  product(_id: ID!): Product
  products(category: ID): [Product!]!
}

type Mutation {
  addProduct(
    productname: String!
    description: String
    price: Float!
    imageUrl: String
    properties: [PropertyInput!]!
    category: ID!
    brand: ID!
  ): Product
  updateProduct(
    _id: ID!
    productname: String
    description: String
    price: Float
    imageUrl: String
    properties: [PropertyInput!]
    category: ID
    brand: ID
  ): Product
  deleteProduct(_id: ID!): Product
}

input PropertyInput {
  key: String!
  value: String!
  type: String
  options: [String]
}
`;
module.exports = typeDefs;


 

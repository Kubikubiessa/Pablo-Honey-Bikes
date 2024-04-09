// category.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID!
    categoryname: String!
    products: [Product!]!
  }

    type Query {
        category(_id: ID!): Category
        categories: [Category!]!
    }
    type Mutation {
        addCategory(
            categoryname: String!
        ): Category!
        updateCategory(
            _id: ID!
            categoryname: String!
            products: [ID!]
        ): Category!
        deleteCategory(_id: ID!): Category
    }
`;

module.exports = typeDefs;

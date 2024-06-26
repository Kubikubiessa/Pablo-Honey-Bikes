// category.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID!
    categoryname: String!
    products: [Product!]!
    brands: [Brand!]
  }

    type Query {
        category(_id: ID!): Category
        categories: [Category!]!
    }
    type Mutation {
        addCategory(
            categoryname: String!
            brands: [ID]
        ): Category!
        updateCategory(
            _id: ID!
            categoryname: String!
            products: [ID!]
            brands: [ID]
        ): Category!
        deleteCategory(_id: ID!): Category
    }
`;

module.exports = typeDefs;

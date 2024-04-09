// User Type Definitions user.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String!
    password: String!
    role: Role
    orders: [Order!]!
  }

  type Role {
    _id: ID!
    name: String!
    scope: [Scope!]!
  }

  type Scope {
    title: String
  }

  input UserInput {
    userId: ID!
    username: String!
  }
  
  type Query {
    me: User
    user(_id: ID!): User
    users: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, desiredRole: String): Auth
    updateUser(_id: ID!, username: String, email: String, password: String): User
    removeUser(_id: ID!): User
    removeAdmin(_id: ID!): User
    login(email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth
 
  }


`;

module.exports = typeDefs;

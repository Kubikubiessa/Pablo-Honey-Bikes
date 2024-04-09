// Order Type Definition order.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Order {
    _id: ID!
    items: [OrderItem!]!
    total: Float!
    status: OrderStatus!
    user: User!
  }

  type OrderItem {
    _id: ID!
    product: Product
    productname: String
    quantity: Int!
  }

  enum OrderStatus {
    CREATED
    PROCESSING
    COMPLETED
    CANCELLED
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  type Query {
    adminOrderResolver(_id: ID!): Order
    adminOrdersResolver: [Order]
    customerOrderResolver(_id: ID!): Order
    customerOrdersResolver: [Order]
  }
  type Mutation {
    addOrder(items: [OrderItemInput!]!, status: String!, userId: ID): Order!
    updateOrder(_id: ID!, status: OrderStatus): Order!
    deleteOrder(_id: ID!): Order
  }

`;

module.exports = typeDefs;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    role: Role!
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

  type Product {
    _id: ID!
    productname: String!
    description: String!
    price: Float!
    size: Int
    width: Float
    weight: Float
    drill: Int
    category: Category!
  }

  type Category {
    _id: ID!
    categoryname: String!
    products: [Product!]!
  }

  type Order {
    _id: ID!
    items: [OrderItem!]!
    total: Float!
    status: OrderStatus!
    user: User!
  }

  type OrderItem {
    _id: ID!
    product: Product!
    quantity: Int!
  }

  enum OrderStatus {
    CREATED
    PROCESSING
    COMPLETED
    CANCELLED
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    product(_id: ID!): Product
    products(category: ID): [Product!]!
    category(_id: ID!): Category
    categories: [Category!]!
    order(_id: ID!): Order
    orders: [Order!]!
    user(_id: ID!): User
    users: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    addProduct(
      productname: String!
      description: String!
      price: Float!
      size: Int
      width: Float
      weight: Float
      drill: Int
      categoryId: ID!
    ): Product!
    updateProduct(
      _id: ID!
      productname: String
      description: String
      price: Float
      width: Float
      weight: Float
      drill: Int
      categoryId: ID
    ): Product!
    
    deleteProduct(_id: ID!): ID!
    addCategory(categoryname: String!): Category!
    updateCategory(_id: ID!, categoryname: String, products: [ID!]): Category!


    deleteCategory(_id: ID!): ID!
    addOrder(items: [OrderItemInput!]!, total: Float!, status: String!, userId: ID): Order!
    updateOrder(_id: ID!, status: OrderStatus): Order!
    deleteOrder(_id: ID!): ID!
  }

  input UserInput {
    userId: ID!
    username: String!
    
    
  }
  

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;

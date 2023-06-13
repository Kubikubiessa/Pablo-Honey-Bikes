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
    id: ID!
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
    id: ID!
    categoryname: String!
    products: [Product!]!
  }

  type Order {
    id: ID!
    items: [OrderItem!]!
    total: Float!
    status: OrderStatus!
  }

  type OrderItem {
    id: ID!
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
    product(id: ID!): Product
    products(category: ID): [Product!]!
    category(id: ID!): Category
    categories: [Category!]!
    order(id: ID!): Order
    orders: [Order!]!
    user(id: ID!): User
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
      id: ID!
      productname: String
      description: String
      price: Float
      size: Int
      width: Float
      weight: Float
      drill: Int
      categoryId: ID
    ): Product!
    deleteProduct(id: ID!): ID!
    addCategory(categoryname: String!): Category!
    updateCategory(id: ID!, categoryname: String): Category!
    deleteCategory(id: ID!): ID!
    addOrder(items: [OrderItemInput!]!): Order!
    updateOrder(id: ID!, status: OrderStatus): Order!
    deleteOrder(id: ID!): ID!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;

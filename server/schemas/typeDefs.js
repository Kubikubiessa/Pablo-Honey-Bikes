const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    orders: [Order!]!
  }
  type Admin {
    _id: ID!
    adminname: String!
    email: String!
    password: String!

  }
  
  type Product {
    id: ID!
    productname: String!
    description: String!
    price: Float!
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
    admin(id: ID!): Admin
    users: [User]!
    admins: [Admin]!
    
  }


  type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      addAdmin(adminname: String!, email: String!, password: String!): Auth
      loginAdmin(email: String!, password: String!): Auth
      removeUser(_id: ID!): User
      removeAdmin(_id: ID!): Admin
      addProduct(name: String!, description: String!, price: Float!, categoryId: ID!): Product!
      updateProduct(id: ID!, name: String, description: String, price: Float, categoryId: ID): Product!
      deleteProduct(id: ID!): ID!
      addCategory(name: String!): Category!
      updateCategory(id: ID!, name: String): Category!
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
// createdAt: String!
  // updatedAt: String!
  // type Mutation {
  //   addUser(username: String!, email: String!, password: String!): UserPayload!
  //   addAdmin(adminname: String!, email: String!, password: String!): AdminPayload!
  //   addProduct(name: String!, description: String!, price: Float!, categoryId: ID!): ProductPayload!
  //   addCategory(name: String!): CategoryPayload!
  //   addOrder(items: [ID!]!): OrderPayload!
  //   updateProduct(id: ID!, name: String, description: String, price: Float, categoryId: ID): Product
  //   updateCategory(id: ID!, name: String): Category
  //   updateOrder(id: ID!, status: String): Order
  //   removeUser(_id: ID!): User
  //   removeAdmin(_id: ID!): Admin
  //   deleteProduct(id: ID!): Product
  //   deleteCategory(id: ID!): Category
  //   deleteOrder(id: ID!): Order
  //   login(email: String!, password: String!): AuthPayload!
  //   loginAdmin(email: String!, password: String!): AuthPayload!
  // }
  
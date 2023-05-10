import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// createProduct mutation
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Float!
    $categoryId: ID!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      categoryId: $categoryId
    ) {
      id
      productname
      description
      price
      category {
        id
        categoryname
      }
    }
  }
`;

// updateProduct mutation
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $categoryId: ID
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      categoryId: $categoryId
    ) {
      id
      productname
      description
      price
      category {
        id
        categoryname
      }
    }
  }
`;

// deleteProduct mutation
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// createCategory mutation
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      categoryname
    }
  }
`;

// updateCategory mutation
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      categoryname
    }
  }
`;

// deleteCategory mutation
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// createOrder mutation
export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!) {
    createOrder(items: $items) {
      id
      items {
        product {
          id
          productname
        }
        quantity
      }
      total
      status
    }
  }
`;

// updateOrder mutation
export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $status: OrderStatus!) {
    updateOrder(id: $id, status: $status) {
      id
      items {
        product {
          id
          productname
        }
        quantity
      }
      total
      status
    }
  }
`;

// deleteOrder mutation
export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

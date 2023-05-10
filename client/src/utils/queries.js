const { gql } = require("@apollo/client");
 
 

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      password
      orders {
        id
        items {
          productId
          quantity
        }
        total
        status
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
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

export const GET_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
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

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      categoryname
      products {
        id
        productname
        description
        price
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      categoryname
      products {
        id
        productname
        description
        price
      }
    }
  }
`;

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      items {
        productId
        quantity
      }
      total
      status
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    orders {
      id
      items {
        productId
        quantity
      }
      total
      status
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      orders {
        id
        items {
          productId
          quantity
        }
        total
        status
      }
    }
  }
`;

export const GET_ADMIN = gql`
  query getAdmin($id: ID!) {
    admin(id: $id) {
      _id
      adminname
      email
      password
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
      orders {
        id
        items {
          productId
          quantity
        }
        total
        status
      }
    }
  }
`;

export const GET_ADMINS = gql`
  query {
    admins {
      _id
      adminname
      email
    }
  }
`;

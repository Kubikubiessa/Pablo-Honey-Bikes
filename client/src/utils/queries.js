const { gql } = require("@apollo/client");

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      role {
        name
        # Include other role fields if needed
      }
      orders {
        _id
        # Include other order fields if needed
      }
      # Include other user fields if needed
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
      role {
        name
        # Include other role fields if needed
      }
      orders {
        _id
        # Include other order fields if needed
      }
      # Include other user fields if needed
    }
  }
`;

export const GET_USER = gql`
  query GetUser($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      role {
        name
        # Include other role fields if needed
      }
      orders {
        _id
        # Include other order fields if needed
      }
      # Include other user fields if needed
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($_id: ID!) {
    category(_id: $_id) {
      _id
      categoryname
      # Include other category fields if needed
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      categoryname
      # Include other category fields if needed
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($_id: ID!) {
    product(_id: $_id) {
      _id
      productname
      description
      price
      properties {
        key
        value
      }
      category {
        _id
        categoryname
      }
      # Include other product fields if needed
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($category: ID) {
    products(category: $category) {
      _id
      productname
      description
      price
      properties {
        key
        value
      }
      category {
        _id
        categoryname
      }
      # Include other product fields if needed
    }
  }
`;

// Add other queries as needed
export const GET_CUSTOMER_ORDER = gql`
  query GetCustomerOrder($_id: ID!) {
    customerOrderResolver(_id: $_id) {
      _id
      items {
        _id
        product {
          _id
          productname
          price
        }
        quantity
      }
      total
      status
      user {
        _id
        username
        email
      }
      # Include other order fields if needed
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders {
    customerOrdersResolver {
      _id
      items {
        _id
        product {
          _id
          productname
          price
        }
        quantity
      }
      total
      status
      user {
        _id
        username
        email
      }
      # Include other order fields if needed
    }
  }
`;

export const GET_ADMIN_ORDER = gql`
  query GetAdminOrder($_id: ID!) {
    adminOrderResolver(_id: $_id) {
      _id
      items {
        _id
        product {
          _id
          productname
          price
        }
        quantity
      }
      total
      status
      user {
        _id
        username
        email
      }
      # Include other order fields if needed
    }
  }
`;

export const GET_ADMIN_ORDERS = gql`
  query GetAdminOrders {
    adminOrdersResolver {
      _id
      items {
        _id
        product {
          _id
          productname
          price
        }
        quantity
      }
      total
      status
      user {
        _id
        username
        email
      }
      # Include other order fields if needed
    }
  }
`;

// Add other queries as needed
export const GET_RENTAL = gql`
  query GetRental($_id: ID!) {
    rental(_id: $_id) {
      _id
      rentalname
      properties {
        key
        value
      }
      price
      # Include other rental fields if needed
    }
  }
`;

export const GET_RENTALS = gql`
  query GetRentals {
    rentals {
      _id
      rentalname
      properties {
        key
        value
      }
      price
      # Include other rental fields if needed
    }
  }
`;
 

export const GET_BRANDS = gql`
  query GetBrands {
    brands {
      _id
      brandname
      imageUrl
      products {
        _id
        productname
      }
      categories {
        _id
        categoryname
      }
    }
  }
`;

export const GET_BRAND = gql`
  query GetBrand($_id: ID!) {
    brand(_id: $_id) {
      _id
      brandname
      imageUrl
      products {
        _id
        productname
      }
      categories {
        _id
        categoryname
      }
    }
  }
`;


//old queries

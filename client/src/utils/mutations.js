import { gql } from "@apollo/client";
 

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
    $desiredRole: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      desiredRole: $desiredRole
    ) {
      token
      user {
        _id
        username
        email
        role {
          name
        
        }
        orders {
          _id
         
        }
        
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($_id: ID!) {
    removeUser(_id: $_id) {
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

 
export const ADD_CATEGORY = gql`
  mutation AddCategory($categoryname: String!) {
    addCategory(categoryname: $categoryname) {
      _id
      categoryname
      # Include other category fields if needed
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($_id: ID!, $categoryname: String, $products: [ID!]) {
    updateCategory(_id: $_id, categoryname: $categoryname, products: $products) {
      _id
      categoryname
      # Include other category fields if needed
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($_id: ID!) {
    deleteCategory(_id: $_id) {
      _id
      # Include other fields if needed
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($productname: String!, $description: String, $properties: [PropertyInput!]!, $price: Float!, $category: ID!) {
    addProduct(productname: $productname, description: $description, properties: $properties, price: $price, category: $category) {
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($_id: ID!, $productname: String!, $description: String, $properties: [PropertyInput!]!, $price: Float!, $category: ID) {
    updateProduct(_id: $_id, productname: $productname, description: $description, properties: $properties, price: $price, category: $category) {
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($_id: ID!) {
    deleteProduct(_id: $_id) {
      _id
      # Include other fields if needed
    }
  }
`;

 

export const ADD_ORDER = gql`
  mutation AddOrder($items: [OrderItemInput!]!, $status: String!, $userId: ID) {
    addOrder(items: $items, status: $status, userId: $userId) {
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

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($_id: ID!, $items: [OrderItemInput!]!, $status: String!) {
    updateOrder(_id: $_id, items: $items, status: $status) {
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

export const DELETE_ORDER = gql`
  mutation DeleteOrder($_id: ID!) {
    deleteOrder(_id: $_id) {
      _id
      # Include other fields if needed
    }
  }
`;

// Add other mutations as needed

export const ADD_RENTAL = gql`
  mutation AddRental($rentalname: String!, $properties: [PropertyInput!]!, $price: Float!, $categoryId: ID!) {
    addRental(rentalname: $rentalname, properties: $properties, price: $price, categoryId: $categoryId) {
      _id
      rentalname
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
export const UPDATE_RENTAL = gql`
  mutation UpdateRental($_id: ID!, $rentalname: String!, $properties: [PropertyInput!]!, $price: Float!, $categoryId: ID) {
    updateRental(_id: $_id, rentalname: $rentalname, properties: $properties, price: $price, categoryId: $categoryId) {
      _id
      rentalname
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

export const DELETE_RENTAL = gql`
  mutation DeleteRental($_id: ID!) {
    deleteRental(_id: $_id) {
      _id
      # Include other fields if needed
    }
  }
`;


export const ADD_BRAND = gql`
  mutation AddBrand($brandname: String!, $imageUrl: String, $products: [ID], $categories: [ID]) {
    addBrand(brandname: $brandname, imageUrl: $imageUrl, products: $products, categories: $categories) {
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

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($_id: ID!, $brandname: String!, $imageUrl: String, $products: [ID], $categories: [ID]) {
    updateBrand(_id: $_id, brandname: $brandname, imageUrl: $imageUrl, products: $products, categories: $categories) {
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

export const DELETE_BRAND = gql`
  mutation DeleteBrand($_id: ID!) {
    deleteBrand(_id: $_id) {
      _id
    }
  }
`;

//old queries
 

 
 

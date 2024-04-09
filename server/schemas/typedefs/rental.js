// rental.js

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Rental {
    _id: ID!
    rentalname: String
    price: Float!
    properties: [Property!]!
  }

    type Property {
        key: String!
        value: String!
    }

    type Query {
        rental(_id: ID!): Rental
        rentals: [Rental!]!
    }

    type Mutation {
        addRental(
            rentalname: String!
            price: Float!
            properties: [PropertyInput!]!
        ): Rental
        updateRental(
            _id: ID!
            rentalname: String!
            price: Float!
            properties: [PropertyInput!]!
        ): Rental!
        deleteRental(_id: ID!): Rental
    }

 
`;

module.exports = typeDefs;

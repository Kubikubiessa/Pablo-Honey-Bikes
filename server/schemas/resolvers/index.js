// Example: index.js

// const userResolvers = require('./user');
// const productResolvers = require('./product');
// const orderResolvers = require('./order');
// const rentalResolvers = require('./rental');
// const categoryResolvers = require('./category');

// const resolvers = [userResolvers, productResolvers, orderResolvers, rentalResolvers, categoryResolvers];

// module.exports = resolvers;

const userResolvers = require('./user');
const productResolvers = require('./product');
const orderResolvers = require('./order');
const rentalResolvers = require('./rental');
const categoryResolvers = require('./category');

// Combine all resolvers into a single object
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...productResolvers.Query,
    ...orderResolvers.Query,
    ...rentalResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...rentalResolvers.Mutation,
    ...categoryResolvers.Mutation,
  }
};

module.exports = resolvers;


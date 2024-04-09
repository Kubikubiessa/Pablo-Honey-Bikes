// Example: index.js

const userResolvers = require('./user');
const productResolvers = require('./product');
const orderResolvers = require('./order');
const rentalResolvers = require('./rental');
const categoryResolvers = require('./category');

const resolvers = [userResolvers, productResolvers, orderResolvers, rentalResolvers, categoryResolvers];

module.exports = resolvers;

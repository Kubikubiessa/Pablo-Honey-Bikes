const db = require('../config/connection');
// const { User, Product, Category, Role, Brand } = require('../models');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Role = require('../models/Role');
const Brand = require('../models/Brand');


const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('./categoryData.json');
const roleData = require('./roleData.json');
const brandData = require('./brandData.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Role.deleteMany({});
    await Brand.deleteMany({});

    const categories = await Category.insertMany(categoryData);
    console.log('Categories seeded!');

    const brands = await Brand.insertMany(brandData);
    console.log('Brands seeded!');

    const roles = await Role.insertMany(roleData);
    console.log('Roles seeded!');

    const users = await User.insertMany(userData.map(user => {
      return { ...user, role: roles[Math.floor(Math.random() * roles.length)]._id };
    }));
    console.log('Users with roles seeded!');

    const products = await Product.insertMany(productData.map(product => {
      return {
        ...product,
        category: categories[Math.floor(Math.random() * categories.length)]._id,
        brand: brands[Math.floor(Math.random() * brands.length)]._id,
      };
    }));
    console.log('Products seeded!');

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
});

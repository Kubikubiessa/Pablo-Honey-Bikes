const db = require('../config/connection');
const User  = require('../models/User');
const Product  = require('../models/Product');
const Category  = require('../models/Category');
const Role  = require('../models/Role');

const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('./categoryData.json');
const roleData = require('./roleData.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Role.deleteMany({});

    const categories = await Category.insertMany(categoryData);
    console.log('Categories seeded!');

    const products = await Product.insertMany(productData);
    console.log('Products seeded!')
    // productData.map((product) => {
    //   const { category: categoryId, ...productData } = product;
    //   const category = categories.find((cat) => cat._id === categoryId);
    //   return { ...productData, category: category._id };
    // });

    const roles = await Role.insertMany(roleData);
    console.log('Roles seeded!');

    const users = await User.create(userData);
    console.log('Users seeded!');

    console.log('Products seeded!');
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
 
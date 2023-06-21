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
    console.log('Categories seeded!', categories);

    const productwithCategories = productData.map((product) => {
      
      return { ...product, category: categories[0] };
    });
    const products = await Product.insertMany(productwithCategories);
    console.log('Products seeded!', products)
    

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }

    // const roles = await Role.insertMany(roleData);
    // console.log('Roles seeded!');

    const roles = await Role.insertMany(roleData);
    console.log('Roles seeded!');
    const userswithRole = userData.map((user) => {
      
      return { ...user, role: roles[0] };
    });
    const users = await User.insertMany(userswithRole);
    console.log('Users with roles seeded!', users)
     

   
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
 
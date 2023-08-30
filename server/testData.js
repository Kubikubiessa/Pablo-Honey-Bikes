//this file is for testing purposes to set up a primary Admin account in order to create other Admin accounts and perform admin-restricted actions
const db = require("./config/connection");
const bcrypt = require('bcrypt');
//const mongoose = require('mongoose');
const User = require('./models/User');  
const Role = require('./models/Role')

 

async function setupTestData(db) {
  try {
    // const hashedPassword = await bcrypt.hash('password1', 10);
    const adminRole = await Role.findOne({ name: "Admin" }); // Query the admin role
    if (!adminRole) {
      throw new Error("Admin role not found");
    }
    // Create and save an admin user with hashed password
    const adminUser = await User.create({
      username: 'pablo',
      email: 'skyhogg4273@yahoo.com',
      password: 'password1',
      role: adminRole._id, // Assign the role ID dynamically
    });
    //const token = signToken(user);
     console.log('Admin user created successfully.', adminUser );
    return { adminUser };
    // await adminUser.save();
  
  } catch (error) {
    console.error('Error setting up test data:', error);
  }
 
}

// Call the function to set up test data
setupTestData(db);

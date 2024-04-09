 

 
// const Role = require("../models/Role");
  
//   module.exports = {
//     getRoleByName: async function (Role, roleName) { try {
//       const role = await Role.findOne({ name: roleName });
//       if (!role) {
//         throw new Error(`Role with name ${roleName} not found.`);
//       }
//       return role.name;  
//     } catch (error) {
//       console.error("getRoleByName:", error);
//       throw error;
//     }
   
//     }
    
//   };
const Role = require("../models/Role");

module.exports = {
  getRoleByName: async function (roleName) {
    try {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        throw new Error(`Role with name ${roleName} not found.`);
      }
      return role;  
    } catch (error) {
      console.error("getRoleByName:", error);
      throw error;
    }
  }
};

// utils/getRoleByName.js
// const Role = require('../models/Role');

// async function getRoleByName(roleName) {
//   const role = await Role.findOne({ name: roleName });
//   if (!role) {
//     throw new Error(`Role with name ${roleName} not found.`);
//   }
//   return role; // Returning the whole role document
// }

// module.exports = getRoleByName;

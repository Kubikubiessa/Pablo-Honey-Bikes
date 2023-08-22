 

const getRoleIdByName = async (Role, roleName) => {
    try {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        throw new Error(`Role with name ${roleName} not found.`);
      }
      return role._id;  
    } catch (error) {
      console.error("getRoleIdByName:", error);
      throw error;
    }
  };
  
  module.exports = {
    getRoleIdByName,
  };
  
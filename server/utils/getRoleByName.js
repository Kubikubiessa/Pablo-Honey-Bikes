 

const getRoleByName = async (Role, roleName) => {
    try {
      const role = await Role.findOne({ name: roleName });
      if (!role) {
        throw new Error(`Role with name ${roleName} not found.`);
      }
      return role.name;  
    } catch (error) {
      console.error("getRoleByName:", error);
      throw error;
    }
  };
  
  module.exports = {
    getRoleByName,
  };
  
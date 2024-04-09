const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { requireAuth } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

 
const categoryResolvers = {
    Query: {
        category: async (parent, { _id }, context, info) => {
            try {
              const category = await Category.findById(_id);
              return category;
            } catch (error) {
              console.error("category:", error);
              throw error;
            }
          },
          categories: async (parent, args, context, info) => {
            try {
              const categories = await Category.find();
              return categories;
            } catch (error) {
              console.error("categories:", error);
              throw error;
            }
          },
    },
    Mutation: {
        addCategory: requireAuth(
            "add_category",
            async (parent, { categoryname }, context, info) => {
              try {
                const userData = context.user;
      
                const userRole = userData.role;
                console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
      
                // Use the authMiddlware middleware
                // authMiddleware(requiredScope)(parent, args, context);
                const category = await Category.create({
                  categoryname,
                });
                return category;
              } catch (error) {
                console.error("addCategory :", error); //defensive programming
                throw error;
              }
            }
          ),
          updateCategory: requireAuth(
            "update_category",
            async (parent, { _id, categoryname, products }, context, info) => {
              try {
                const userData = context.user;
                const userRole = userData.role;
                console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
                // Create an object with the fields to update
                const updateFields = {
                  categoryname,
                  products,
                };
      
                // Remove undefined or null fields from the object
                Object.keys(updateFields).forEach((key) => {
                  if (updateFields[key] === undefined || updateFields[key] === null) {
                    delete updateFields[key];
                  }
                });
                //updating category with the respective fields
                const updatedCategory = await Category.findByIdAndUpdate(
                  _id,
                  updateFields,
                  { new: true }
                );
                return updatedCategory;
              } catch (error) {
                console.error("updateCategory:", error);
                throw error;
              }
            }
          ),
          deleteCategory: requireAuth(
            "delete_category",
            async (parent, { _id, products }, context, info) => {
              try {
                const userData = context.user;
                const userRole = userData.role;
                // console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
                const deletedCategory = await Category.findOneAndDelete({ _id: _id });
                const updatedProduct = await Product.updateMany(
                  { category: deletedCategory._id },
                  { $set: { category: null } }
                );
                console.log("deleted category :", deletedCategory._id);
                return updatedProduct;
              } catch (error) {
                console.error("deletedCategory:", error);
                throw error;
              }
            }
          ),
      
    }

};
module.exports = categoryResolvers;
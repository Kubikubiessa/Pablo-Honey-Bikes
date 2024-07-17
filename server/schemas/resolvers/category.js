const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { requireAuth } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const Brand = require("../../models/Brand");

 
const categoryResolvers = {
  Query: {
    category: async (parent, { _id }, context, info) => {
      try {
        const category = await Category.findById(_id)
          .populate('products')   
          .populate('brands');   
        if (!category) {
          throw new Error('Category not found');
        }
        return category;
      } catch (error) {
        console.error("category:", error);
        throw error;
      }
    },

    categories: async (parent, args, context, info) => {
      try {
        const categories = await Category.find()
          .populate("products")   
          .populate("brands");   
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
      async (parent, { categoryname, slug }, context, info) => {
        try {
          const userData = context.user;

          const userRole = userData.role;
          if (!userData || !userRole) {
            throw new AuthenticationError("Not authenticated");
          }

          const category = await Category.create({
            categoryname,
            slug,
          });
          return category;
        } catch (error) {
          console.error("addCategory :", error);
          throw error;
        }
      }
    ),
    updateCategory: requireAuth(
      "update_category",
      async (parent, { _id, categoryname, slug, products, brands }, context, info) => {
        try {
          const userData = context.user;
          const userRole = userData.role;
          if (!userData || !userRole) {
            throw new AuthenticationError("Not authenticated");
          }

          const updateFields = {
            categoryname,
            slug,
            products,
            brands,
          };

          Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === undefined || updateFields[key] === null) {
              delete updateFields[key];
            }
          });

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
      async (parent, { _id }, context, info) => {
        try {
          const userData = context.user;
          const userRole = userData.role;
          if (!userData || !userRole) {
            throw new AuthenticationError("Not authenticated");
          }

          const deletedCategory = await Category.findOneAndDelete({ _id });
          if (!deletedCategory) {
            throw new Error("Category not found");
          }

          await Promise.all([
            Brand.updateMany(
              { categories: deletedCategory._id },
              { $pull: { categories: deletedCategory._id } }
            ),
            Product.updateMany(
              { category: deletedCategory._id },
              { $unset: { category: "" } }
            )
          ]);

          console.log("References to the deleted category have been removed from Brands and Products.");
          return deletedCategory;
        } catch (error) {
          console.error("Error in deleteCategory:", error);
          throw error;
        }
      }
    ),
  }
};

module.exports = categoryResolvers;

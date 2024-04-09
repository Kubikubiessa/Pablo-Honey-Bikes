const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { requireAuth } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const productResolvers = {
    Query: {
        product: async (parent, { _id }, context, info) => {
            try {
              const product = await Product.findById(_id).populate("category");
              return product;
            } catch (error) {
              console.error("product:", error);
              throw error;
            }
          },
          products: async (parent, { category }, context, info) => {
            try {
              // const query = category ? { category: category } : {};
              const products = await Product.find().populate("category");
              console.log("Products", products);
              return products;
            } catch (error) {
              console.error("products:", error);
              throw error;
            }
          },
    },
    Mutation: {
        addProduct: requireAuth(
            "add_product",
            async (parent, { properties, categoryId }, context, info) => {
              //console.log('context:', context)
              try {
                const userData = context.user;
                const userRole = userData.role;
                console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
      
                const category = await Category.findById(categoryId);
                if (!category) {
                  throw new Error("Category not found");
                }
                const product = await Product.create({
                  productname,
                  properties,
                  price,
                  category: category._id,
                });
                return product;
              } catch (error) {
                console.error("addProduct :", error);
                throw error;
              }
            }
          ),
          updateProduct: requireAuth(
            "update_product",
            async (parent, { _id, properties, categoryId }, context, info) => {
              try {
                const userData = context.user;
                const userRole = userData.role;
                console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
      
                // Create an object with the fields to update
                const updateFields = {
                  productname,
                  properties: properties,
                  price,
                  category: categoryId,
                };
                // categoryId handled separately, as it might be null
      
                if (categoryId !== undefined) {
                  updateFields.category = categoryId;
                } else if (categoryId === null) {
                  // If categoryId is explicitly set to null in the mutation, clear it
                  updateFields.category = null;
                }
      
                const updatedProduct = await Product.findByIdAndUpdate(
                  { _id },
                  updateFields,
                  { new: true }
                );
      
                console.log("updated product", updatedProduct);
                return updatedProduct;
              } catch (error) {
                console.error("updated product :", error);
                throw error;
              }
            }
          ),
          deleteProduct: requireAuth(
            "delete_product",
            async (parent, { _id }, context, info) => {
              try {
                const userData = context.user;
                const userRole = userData.role;
                console.log("user data and role:", userData, userRole);
                if (!userData || !userRole) {
                  throw new AuthenticationError("Not authenticated");
                }
                const deletedProduct = await Product.findOneAndDelete({ _id: _id });
                const categoryId = deletedProduct.category;
      
                const updatedCategory = await Category.findOneAndUpdate(
                  { _id: categoryId },
                  { $pull: { products: deletedProduct._id } }
                );
                console.log("product deleted :", deletedProduct._id);
                return updatedCategory;
              } catch (error) {
                console.error("deletedProduct:", error);
                throw error;
              }
            }
          ),
    }
};
module.exports = productResolvers;
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");
const { requireAuth } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const productResolvers = {
  Query: {
    product: async (parent, { _id }, context, info) => {
      try {
        const product = await Product.findById(_id)
          .populate("category")
          .populate("brand");
        if (!product) {
          throw new Error("Product not found");
        }
        return product;
      } catch (error) {
        console.error("product:", error);
        throw error;
      }
    },
    products: async (parent, { category }, context, info) => {
      try {
        const query = category ? { category } : {};
        const products = await Product.find(query)
          .populate("category")
          .populate("brand");
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
      async (
        parent,
        { productname, description, price, properties, imageUrl, category, brand },
        context,
        info
      ) => {
        try {
          const userData = context.user;
          if (!userData || !userData.role) {
            throw new AuthenticationError("Not authenticated");
          }

          const categoryDoc = await Category.findById(category);
          if (!categoryDoc) {
            throw new Error("Category not found");
          }

          const brandDoc = await Brand.findById(brand);
          if (!brandDoc) {
            throw new Error("Brand not found");
          }

          const product = await Product.create({
            productname,
            description,
            properties,
            price,
            imageUrl,
            category: categoryDoc._id,
            brand: brandDoc._id,
          });

          return await product
            .populate("category")
            .populate("brand")
            .execPopulate(); // Proper use of populate after creation
        } catch (error) {
          console.error("addProduct :", error);
          throw error;
        }
      }
    ),
    updateProduct: requireAuth(
      "update_product",
      async (
        parent,
        { _id, productname, description, price, properties, imageUrl, category, brand },
        context,
        info
      ) => {
        try {
          const userData = context.user;
          if (!userData || !userData.role) {
            throw new AuthenticationError("Not authenticated");
          }

          const updateFields = {
            productname,
            description,
            properties,
            price,
            imageUrl,
            category,
            brand,
          };

          const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            updateFields,
            { new: true }
          )
            .populate("category")
            .populate("brand");

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
          if (!userData || !userData.role) {
            throw new AuthenticationError("Not authenticated");
          }

          const deletedProduct = await Product.findByIdAndDelete(_id);
          if (!deletedProduct) {
            throw new Error("Product not found");
          }

          // Optionally update the category and brand if necessary
          if (deletedProduct.category) {
            await Category.findByIdAndUpdate(deletedProduct.category, {
              $pull: { products: _id },
            });
          }

          if (deletedProduct.brand) {
            await Brand.findByIdAndUpdate(deletedProduct.brand, {
              $pull: { products: _id },
            });
          }

          return deletedProduct;
        } catch (error) {
          console.error("deletedProduct:", error);
          throw error;
        }
      }
    ),
  },
};

module.exports = productResolvers;

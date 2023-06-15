const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models/User");

const  Product  = require("../models/Product");
const { Category } = require("../models/Category");
const { Order } = require("../models/Order");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        // .select('-__v -password')
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args, context, info) => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error("users:", error);
        throw error;
      }
    },

    product: async (parent, { id }, context, info) => {
      try {
        const product = await Product.findById(id);
        return product;
      } catch (error) {
        console.error("product:", error);
        throw error;
      }
    },
    products: async (parent, { category }, context, info) => {
      try {
        const query = category ? { category: category } : {};
        const products = await Product.find(query);
        return products;
      } catch (error) {
        console.error("products:", error);
        throw error;
      }
    },

    category: async (parent, { id }, context, info) => {
      try {
        const category = await Category.findById(id);
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
    order: async (parent, { id }, context, info) => {
      try {
        const order = Order.findById(id);
        return order;
      } catch (error) {
        console.error("order:", error);
        throw error;
      }
    },
    orders: async (parent, args, context, info) => {
      try {
        const orders = await Order.find();
        return orders;
      } catch (error) {
        console.error("orders:", error);
        throw error;
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("addUser :", error);
        throw e;
      }
    },

    addProduct: async (
      parent,
      { name, description, price, categoryId },
      context,
      info
    ) => {
      try {
        const product = await Product.create({
          productname,
          description,
          price,
          size,
          width,
          weight,
          drill,
          category: categoryId,
        });
        return { Product };
      } catch (e) {
        console.error("addProduct :", e); //defensive programming
        throw e;
      }
    },
    addCategory: async (parent, { name }, context, info) => {
      try {
        const category = await Category.create({
          categoryname,
        });
        return { Category };
      } catch (e) {
        console.error("addCategory :", e); //defensive programming
        throw e;
      }
    },
    addOrder: async (parent, { items }, context, info) => {
      try {
        const category = await Order.create({
          items,
        });
        return { Order };
      } catch (e) {
        console.error("addOrder :", e); //defensive programming
        throw e;
      }
    },

    //all Update processes of the database
    updateProduct: (
      parent,
      { id, productname, description, price, width, weight, drill, categoryId },
      context,
      info
    ) => {
      const updatedProduct = Product.findByIdAndUpdate(
        id,
        { productname, description, price, width, weight, drill, category: categoryId },
        { new: true }
      );
      return updatedProduct;
    },
    updateCategory: (parent, { id, name }, context, info) => {
      const updatedCategory = Category.findByIdAndUpdate(
        id,
        { categoryname },
        { new: true }
      );
      return updatedCategory;
    },
    updateOrder: (parent, { id, status }, context, info) => {
      const updatedOrder = Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      return updatedOrder;
    },
    // All delete processes of the database

    removeUser: async (parent, { _id }) => {
      return User.findOneAndDelete({ _id: _id });
    },

    deleteProduct: (parent, { id }, context, info) => {
      const deletedProduct = Product.findByIdAndDelete(id);
      return deletedProduct;
    },
    deleteCategory: (parent, { id }, context, info) => {
      const deletedCategory = Category.findByIdAndDelete(id);
      return deletedCategory;
    },
    deleteOrder: (parent, { id }, context, info) => {
      const deletedOrder = Order.findByIdAndDelete(id);
      return deletedOrder;
    },

    //all login processes
    login: async (parent, { email, password }) => {
      try {
        console.log("login: ", email, password);
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("No profile with this email found!");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }

        const token = signToken(user);
        return { token, user };
      } catch (e) {
        console.error("login :", e);
        throw e;
      }
    },
  },
};

module.exports = resolvers;

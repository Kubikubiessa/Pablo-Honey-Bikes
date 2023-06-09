const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models/User");
const { Admin } = require("../models/Admin");
const { Product } = require("../models/Product");
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
    users: (parent, args, context, info) => {
      const users = User.find();
      return users;
    },
    admin: async (parent, args, context) => {
      if (context.admin) {
        const adminData = await Admin.findOne({ _id: context.admin._id });
        // .select('-__v -password')
        return adminData;
      }
      throw new AuthenticationError("Not logged in");
    },
    admins: (parent, args, context, info) => {
      const admins = Admin.find();
      return admins;
    },

    product: (parent, { id }, context, info) => {
      const product = Product.findById(id);
      return product;
    },
    products: (parent, { category }, context, info) => {
      if (category) {
        const products = Product.find({ category: category });
        return products;
      } else {
        const products = Product.find();
        return products;
      }
    },
    category: (parent, { id }, context, info) => {
      const category = Category.findById(id);
      return category;
    },
    categories: (parent, args, context, info) => {
      const categories = Category.find();
      return categories;
    },
    order: (parent, { id }, context, info) => {
      const order = Order.findById(id);
      return order;
    },
    orders: (parent, args, context, info) => {
      const orders = Order.find();
      return orders;
    },
  },

  Mutation: {
    //All additions to the database
    addUser: async (parent, { username, email, password }) => {
      try {
        console.log(username, email, password);
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user };
      } catch (e) {
        console.error("addUser :", e); //defensive programming
        throw e;
      }
    },
    addAdmin: async (parent, { adminname, email, password }) => {
      try {
        console.log(adminname, email, password);
        const admin = await Admin.create({ adminname, email, password });
        const token = signToken(admin);

        return { token, Admin };
      } catch (e) {
        console.error("addAdmin :", e); //defensive programming
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
          name,
          description,
          price,
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
          name,
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
      { id, name, description, price, categoryId },
      context,
      info
    ) => {
      const updatedProduct = Product.findByIdAndUpdate(
        id,
        { name, description, price, category: categoryId },
        { new: true }
      );
      return updatedProduct;
    },
    updateCategory: (parent, { id, name }, context, info) => {
      const updatedCategory = Category.findByIdAndUpdate(
        id,
        { name },
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
    removeAdmin: async (parent, { _id }) => {
      return Admin.findOneAndDelete({ _id: _id });
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
    loginAdmin: async (parent, { email, password }) => {
      try {
        console.log("login: ", email, password);
        const admin = await Admin.findOne({ email });

        if (!admin) {
          throw new AuthenticationError("No profile with this email found!");
        }

        const correctPw = await admin.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }

        const token = signToken(admin);
        return { token, admin };
      } catch (e) {
        console.error("login :", e);
        throw e;
      }
    },
  },
};

module.exports = resolvers;

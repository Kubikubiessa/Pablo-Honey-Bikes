const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require('bcrypt'); 
const User = require("../models/User");
const OrderItem = require("../models/OrderItem"); // Import statement for the OrderItem type
const Role = require("../models/Role");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const { signToken } = require("../utils/auth");
const { authMiddleware } = require("../utils/auth");
const { requireAuth } = require("../utils/auth"); 
const { getRoleIdByName } = require ("../utils/getRoleIdByName")
// Import your requireAuth function
//const { checkAuthorization } = require("../utils/auth"); // Import your requireAuth function
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate("role")
          .populate("orders");
        // .select('-__v -password')
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args, context, info) => {
      try {
        const users = await User.find().populate("role").populate("orders");
        return users;
      } catch (error) {
        console.error("users:", error);
        throw error;
      }
    },

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
    order: async (parent, { _id }, context, info) => {
      try {
        const order = Order.findById(_id).populate("user");
        return order;
      } catch (error) {
        console.error("order:", error);
        throw error;
      }
    },
    orders: async (parent, args, context, info) => {
      try {
        const orders = await Order.find().populate("user");
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
        const hashedPassword = await bcrypt.hash(password, 10);
         const userRole = await Role.findOne({ name: 'Customer' });
         if (!userRole) {
           throw new Error("Role not found");
         }
        const user = await User.create({
          username,
          email,
          hashedPassword,
         role: userRole._id,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("addUser :", error);
        throw error;
      }
    },
    addAdmin: async (parent, { username, email, password, desiredRole }, context) => {
      try {
        // Check if the authenticated user has the necessary permissions
        if (!context.user || context.user.role.name !== "Admin") {
          throw new Error("You don't have the necessary permissions to create this user.");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Retrieve the ObjectId reference of the desired Role
        const desiredRoleId = getRoleIdByName(desiredRole); // I implemented this function in separate file in utils folder
    
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          role: desiredRoleId,
        });
    
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("addAdmin:", error);
        throw error;
      }
    },
    
    addProduct: requireAuth('add_product', async (
      parent,
      {
        productname,
        description,
        price,
        size,
        width,
        weight,
        drill,
        categoryId,
      },
      context,
      info
    ) => {
      try {
        if (!context.user|| !context.user.role) {
          throw new AuthenticationError("Not authenticated");
        }
    
        const category = await Category.findById(categoryId);
        if (!category) {
          throw new Error("Category not found");
        }
        const product = await Product.create({
                productname,
                description,
                price,
                size,
                width,
                weight,
                drill,
                category: category._id,
              });
              return product;
            } catch (error) {
              console.error("addProduct :", error);
              throw error;
            }
    
       
       
    }),
    

    // addProduct: requireAuth('add_product', async (
    //   parent,
    //   {
    //     productname,
    //     description,
    //     price,
    //     size,
    //     width,
    //     weight,
    //     drill,
    //     categoryId,
    //   },
    //   context,
    //   info
    // ) => {
    //   try {
         
    //     const category = await Category.findById(categoryId);
    //     if (!category) {
    //       throw new Error("Category not found");
    //     }

    //     const product = await Product.create({
    //       productname,
    //       description,
    //       price,
    //       size,
    //       width,
    //       weight,
    //       drill,
    //       category: category._id,
    //     });
    //     return product;
    //   } catch (error) {
    //     console.error("addProduct :", error);
    //     throw error;
    //   }
    // }),

    addCategory: requireAuth('add_category', async (parent, { categoryname }, context, info) => {
      try {
         
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
    }),

    addOrder: async (parent, { items, status, userId }, context, info) => {
      try {
        // Create an array to store the order items
        const orderItems = await Promise.all(
          items.map(async (item) => {
            return await OrderItem.create({
              product: item.productId,
              quantity: item.quantity,
            });
          })
        );
       

        const total = items.reduce(async (acc, curr) => {
          const { price } = await Product.findById(curr.productId);
          return acc + price * curr.quantity;
        }, 0);

        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Create the order and associate the order items
        const order = await Order.create({
          items: orderItems,
          status,
          total,
          user: user._id, // Convert user ID to ObjectId
        }); 

        // Update the order reference in the User document
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { orders: order._id },
        });

        return order;
      } catch (error) {
        console.error("addOrder:", error);
        throw error;
      }
    },
 

    //all Update processes of the database
    updateOrder: async (parent, { _id, items, status }, context, info) => {
      try {
        // Find the order by orderId
        const order = await Order.findById(_id);

        if (!order) {
          throw new Error("Order not found");
        }

        // Clear the existing items
        order.items = [];

        // Iterate over the new items
        for (const item of items) {
          const { product, quantity } = item;

          // Create a new OrderItem for each item
          const orderItem = await OrderItem.create({
            product,
            quantity,
          });

          // Push the OrderItem to the order's items array
          order.items.push(orderItem);
        }

        // Update the order status
        order.status = status;

        // Save the updated order
        await order.save();

        // Update the order reference in the User document
        await User.findOneAndUpdate(
          { _id: context.user._id, orders: { $in: [order._id] } },
          { $set: { "orders.$.status": status } }
        );

        return order;
      } catch (error) {
        console.error("updateOrder:", error);
        throw error;
      }
    },

    updateProduct: requireAuth('update_product', async (
      parent,
      {
        _id,
        productname,
        description,
        price,
        width,
        weight,
        drill,
        categoryId,
      },
      context,
      info
    ) => {
      const updatedProduct = await Product.findByIdAndUpdate(
        {
          _id,
          productname,
          description,
          price,
          width,
          weight,
          drill,
          categoryId,
        },

        { new: true }
      );
      return updatedProduct;
    }),
    updateCategory: requireAuth('update_category',async (
      parent,
      { _id, categoryname, products },
      context,
      info
    ) => {
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          _id,
          { categoryname, products },
          { new: true }
        );
        return updatedCategory;
      } catch (error) {
        console.error("updateCategory:", error);
        throw error;
      }
    }),

    // All delete processes of the database

    removeUser: async (parent, { _id }) => {
      try {
        const removedUser = await User.findOneAndDelete(_id);
        await Order.updateMany(
          { user: removedUser._id },
          { status: "CANCELLED" }
        );
        return removedUser;
      } catch (error) {
        console.error("removedUser:", error);
        throw error;
      }
    },

    deleteProduct: requireAuth('delete_product',async (parent, { _id }) => {
      try {
        
        const deletedProduct = await Product.findOneAndDelete(_id);

        await Category.findOneAndUpdate(
          { product: deletedProduct._id },
          { $pull: { product: deletedProduct._id } }
        );
        return deletedProduct;
      } catch (error) {
        console.error("deletedProduct:", error);
        throw error;
      }
    }),
    deleteCategory: requireAuth('delete_category',async (parent, { _id }) => {
      try {
        const deletedCategory = await Category.findOneAndDelete(_id);
        await Product.updateMany(
          { category: deletedCategory._id },
          { category: null }
        );
        return deletedCategory;
      } catch (error) {
        console.error("deletedCategory:", error);
        throw error;
      }
    }),

    deleteOrder: async (parent, { _id }, context, info) => {
      try {
        // Find the order that needs to be deleted
        const deletedOrder = await Order.findByIdAndDelete(_id);

        // Remove the order reference from the User document
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { orders: deletedOrder._id } }
        );

        return deletedOrder;
      } catch (error) {
        console.error("deleteOrder:", error);
        throw error;
      }
    },

    //all login pro 
    
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

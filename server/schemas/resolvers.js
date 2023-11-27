const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const OrderItem = require("../models/OrderItem"); // Import statement for the OrderItem type
const Role = require("../models/Role");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const { signToken } = require("../utils/auth");
const { authMiddleware } = require("../utils/auth");
const { requireAuth } = require("../utils/auth");
const { getRoleByName } = require("../utils/getRoleByName");

//const { checkAuthorization } = require("../utils/auth"); // Import  requireAuth function
const fetch = require("node-fetch");

const resolvers = {
  Query: {
  

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
    users: requireAuth("manage_users", async (parent, args, context, info) => {
      try {
        const userData = context.user;
        const userRole = userData.role;
        if (!userData || !userRole) {
          throw new AuthenticationError("Not authenticated");
        }
        const users = await User.find().populate("role").populate("orders");
        return users;
      } catch (error) {
        console.error("users:", error);
        throw error;
      }
    }),
    user: requireAuth(
      "manage_users",
      async (parent, { _id }, context, info) => {
        try {
          const userData = context.user;
          const userRole = userData.role;

          if (!userData || !userRole) {
            throw new AuthenticationError("Not authenticated");
          }
          const user = await User.findById(_id)
            .populate("role")
            .populate("orders");
          return user;
        } catch (error) {
          console.error("user:", error);
          throw error;
        }
      }
    ),

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
    customerOrderResolver: async (parent, { _id }, context, info) => {
      if (context.user) {
        try {
          const customerOrder = await Order.findOne({
            _id,
            user: context.user._id,
          })
            .populate({
              path: "items",
              populate: {
                path: "product",
                model: "Product",
                select: "productname price",
              },
            })
            .populate({
              path: "user",
              model: "User",
              select: "username email",
            });

          if (
            customerOrder &&
            customerOrder.items &&
            customerOrder.items.length > 0
          ) {
            return customerOrder;
          }
        } catch (error) {
          console.error("customer order:", error);
          throw error;
        }
      } else {
        throw new AuthenticationError("Not logged in");
      }
    },
    adminOrderResolver: requireAuth(
      "manage-orders",
      async (parent, { _id }, context, info) => {
        if (context.user) {
          try {
            const adminOrder = await Order.findById(_id)
              .populate({
                path: "items",
                populate: {
                  path: "product",
                  model: "Product",
                  select: "productname price",
                },
              })
              .populate({
                path: "user",
                model: "User",
                select: "username email",
              });

            if (adminOrder && adminOrder.items && adminOrder.items.length > 0) {
              return adminOrder;
            }
          } catch (error) {
            console.error("admin order:", error);
            throw error;
          }
        } else {
          throw new AuthenticationError("Not logged in");
        }
      }
    ),

    customerOrdersResolver: async (parent, args, context, info) => {
      if (context.user) {
        try {
          const customerOrders = await Order.find({
            user: context.user._id,
          })
            .populate({
              path: "items",
              populate: {
                path: "product",
                model: "Product",
                select: "productname price",
              },
            })
            .populate({
              path: "user",
              model: "User",
              select: "username email",
            });

          if (
            customerOrders &&
            customerOrders.items &&
            customerOrders.items.length > 0
          ) {
            return customerOrders;
          }
        } catch (error) {
          console.error("customer orders:", error);
          throw error;
        }
      } else {
        throw new AuthenticationError("Not logged in");
      }
    },

    adminOrdersResolver: requireAuth(
      "manage-orders",
      async (parent, args, context, info) => {
        if (context.user) {
          try {
            const adminOrders = await Order.find()
              .populate({
                path: "items",
                populate: {
                  path: "product",
                  model: "Product",
                  select: "productname price",
                },
              })
              .populate({
                path: "user",
                model: "User",
                select: "username email",
              })
              .exec();
            //console.log("orders to be viewed:", adminOrders);
            if (
              !adminOrders ||
              adminOrders.length === 0 ||
              adminOrders.items === 0
            ) {
              throw new Error("No orders found.");
            }
            console.log("orders to be viewed:", adminOrders);
            return adminOrders || [];
          } catch (error) {
            console.error("admin orders:", error);
            throw error;
          }
        } else {
          throw new AuthenticationError("Not logged in");
        }
      }
    ),
  },

  Mutation: {
    addUser: async (
      parent,
      { username, email, password, desiredRole },
      context
    ) => {
      const desiredRoleName = await getRoleByName(desiredRole); // I implemented this function in separate file in utils folder
      // Checking if the authenticated user has the necessary permission to create an admin account
      if (
        (desiredRoleName == "Admin" && // admin name instead of previous admin ObjectID, which is more dynamic, using hard-coded IDs require DB work when transitioning to another DB.
          !context.user) ||
        context.user.role.name !== "Admin"
      ) {
        throw new Error(
          "You don't have the necessary permissions to create this user."
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Retrieve the ObjectId reference of the desired Role

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: desiredRoleName,
      });

      const token = signToken(user);
      return { token, user };
    },

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

    addOrder: requireAuth(
      "place_order",
      async (parent, { items, status, userId }, context, info) => {
        try {
          const userData = context.user;
          const userRole = userData.role;
          const userId = userData._id;
          const userName = userData.username;

          if (!userData || !userRole || !userName) {
            throw new AuthenticationError("Not authenticated");
          }
          // Create an array to store the order items

          const orderItems = await Promise.all(
            items.map(async (item) => {
              const product = await Product.findById(item.productId);

              if (!product) {
                throw new Error(`Product with ID ${item.productId} not found.`);
              }
              //console.log('product of order:', product)
              const productname = product.productname;

              // Ensuring the product field contains all necessary fields
              const orderItem = await OrderItem.create({
                product: product,
                quantity: item.quantity,
              });
              orderItem.productname = productname;
              console.log("product name:", productname);
              //console.log('one order item created:', orderItem)
              return orderItem;
            })
          );

          //console.log("order items:", orderItems);

          const total = await items.reduce(async (acc, curr) => {
            // Fetching the product data first
            const product = await Product.findById(curr.productId);

            // Checking if the product exists and has a valid price
            if (product && typeof product.price === "number") {
              // Adding the product price * quantity to the accumulator
              return acc + product.price * curr.quantity;
            } else {
              // Handling the case where the product is not found or has invalid data

              return acc;
            }
          }, 0);
          // console.log("order items:", orderItems);
          // Creating the order and associate the order items
          const order = await Order.create({
            items: orderItems,
            status,
            total,
            user: {
              _id: userId,
              username: userName,
            }, // Convert user ID to ObjectId
          });
          //   await order.populate({
          //     path: 'items',
          // populate: { path: 'product', select: 'productname'
          //   }}).populate("user")
          //   ;
          // await order.populate({path: "items", populate: { path: "product"}});
          await order.populate("user");
          await order.populate("items");

          //populating the user field on the order object with the user document from the User collection.
          // Updating the order reference in the User document

          await User.findByIdAndUpdate(userId, {
            $addToSet: { orders: order._id },
          });
          console.log("Order:", order);
          return order;
        } catch (error) {
          console.error("addOrder:", error);
          throw error;
        }
      }
    ),

    //all Update processes of the database
    updateOrder: requireAuth(
      "manage_orders",
      async (parent, { _id, items, status }, context, info) => {
        try {
          const userData = context.user;
          const userRole = userData.role;
          // console.log("user data and role:", userData, userRole);
          if (!userData || !userRole) {
            throw new AuthenticationError("Not authenticated");
          }
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

    deleteOrder: async (parent, { _id }, context, info) => {
      try {
        // Find the order that needs to be deleted
        const deletedOrder = await Order.findByIdAndDelete({ _id });

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
        // console.log("login: ", email, password);
        // console.log("Received password:", password);
        const user = await User.findOne({ email }).populate("role");

        console.log("user:", user);
        if (!user) {
          throw new AuthenticationError("No profile with this email found!");
        }

        const correctPw = await user.isCorrectPassword(password.trim());
        console.log("correct password:", correctPw);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }

        const token = signToken(user);
        console.log("logged in!");
        return { token, user };
      } catch (e) {
        console.error("login :", e);
        throw e;
      }
    },
  },
};

module.exports = resolvers;

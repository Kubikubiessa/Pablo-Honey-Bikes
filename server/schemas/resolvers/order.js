const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const Product = require("../../models/Product");
const User = require("../../models/User");
const { AuthenticationError } = require("apollo-server-express");

const { requireAuth } = require("../../utils/auth");

const orderResolvers = {
  Query: {
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
            //console.log("customer order:", customerOrder);
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
  },
};
module.exports = orderResolvers;

const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Order = require("../models/Order");
const { signToken } = require("../utils/auth");
const { requireAuth } = require("../utils/auth");
const { getRoleByName } = require("../utils/getRoleByName");
const fetch = require("node-fetch");
const userResolvers = {
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
    }
}

module.exports = userResolvers;
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Order = require("../../models/Order");
const { signToken } = require("../../utils/auth");
const { requireAuth } = require("../../utils/auth");
const { getRoleByName } = require("../../utils/getRoleByName");
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
            { username, email, password, desiredRole = "Customer" },
            context
          ) => {
            const desiredRoleName = await getRoleByName(desiredRole); // I implemented this function in separate file in utils folder
           
      
            // const hashedPassword = await bcrypt.hash(password, 10);
      
            // Retrieve the ObjectId reference of the desired Role
      
            const user = await User.create({
              username,
              email,
              password,
              role: desiredRoleName._id,
            });
            await user.populate('role')
            const token = signToken(user);
            console.log("User added successfully:", user.username);
            return { token, user };
          },
          login: async (parent, { email, password }, context, info) => {
            console.log("Login resolver called");
            
            try {
         
               console.log("login: ", email, password);
            


              const user = await User.findOne({ email }).populate("role");
      
             console.log("User found:", user ? user.username : "None", "Role:", user.role ? user.role.name : "No role");
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
          adminLogin: async (parent, { email, password }, context, info) => {
            console.log("adminLogin called");
            try {
              // Log the received email for diagnostic purposes
              //console.log("Attempting login for email:", email);
              
              // Find the user by email and populate the role
              const user = await User.findOne({ email }).populate("role");
              //console.log("User found:", user);
          
              // Check if the user object is returned and has a role
              if (!user) {
                console.log("No profile with this email found!");
                throw new AuthenticationError("No profile with this email found!");
              }
          
              // Check if the user has the correct password
              const correctPw = await user.isCorrectPassword(password.trim());
              console.log("Password correct:", correctPw);
              if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
              }
          
              // Check user role to ensure they have admin access
              if (!user.role || user.role.name !== "Admin") {
                console.log("User does not have Admin role:", user.role);
                throw new AuthenticationError("You do not have admin permissions.");
              }
          
              // Generate a token for the user
              const token = signToken(user);
              console.log("Admin logged in successfully" );
          
              // Return the authentication token and user
              return { token, user };
            } catch (e) {
              console.error("Admin login error:", e);
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
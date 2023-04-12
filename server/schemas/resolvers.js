const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models/User");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    
  me: async (parent, args, context) => {
    if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        // .select('-__v -password')
        return userData;
    }
    throw new AuthenticationError('Not logged in');
}


}, 


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        console.log(username, email, password)
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user };
      } catch (e) {
        console.error("addUser :", e); //defensive programming
        throw e;
      }
    },
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
      return { token, user }
    }catch (e){
      console.error("login :", e); 
      throw e;
    }
    
  },
 
    removeUser: async (parent, { _id }) => {
      return User.findOneAndDelete({ _id: _id });
    },
     
     
  },
};

module.exports = resolvers;

 
      const Rental = require("../../models/Rental");
      const User = require("../../models/User");
      const { requireAuth } = require("../../utils/auth");
      const { AuthenticationError } = require("apollo-server-express");


        const rentalResolvers = {
            Query: {
                rentals: async (parent, context, info) => {
                    try {
                      const rentals = await Rental.find();
                      return rentals;
                    }
                    catch (error) {
                      console.error("rentals:", error);
                      throw error;
                    }
                },
                rental: async (parent, { _id }, context, info) => {
                    // Logic to fetch and return a specific rental by ID
                    try {
                      const rental = await Rental.findById(_id);
                      return rental;
                    }catch (error) {
                      console.error("rental:", error);
                      throw error;
                    }
                },
            },
            Mutation: {
                // Implement rental mutations
                addRental: requireAuth(
                    "manage_rentals",
                    async (parent, { rentalname, properties, price }, context, info) => {
                      //console.log('context:', context)
                      try {
                        const userData = context.user;
                        const userRole = userData.role;
                        console.log("user data and role:", userData, userRole);
                        if (!userData || !userRole) {
                          throw new AuthenticationError("Not authenticated");
                        }
              
                        const rental = await Rental.create({
                          rentalname,
                        properties,
                          price,
                        
                        });
                        return rental;
                      } catch (error) {
                        console.error("addRental :", error);
                        throw error;
                      }
                    }
                  ),
                  updateRental: requireAuth(
                    "manage_rentals",
                    async (parent, { _id, rentalname, properties, price, quantity }, context, info) => {
                      //console.log('context:', context)
                      try {
                        const userData = context.user;
                        const userRole = userData.role;
                        console.log("user data and role:", userData, userRole);
                        if (!userData || !userRole) {
                          throw new AuthenticationError("Not authenticated");
                        }
              
                        const rental = await Rental.findByIdAndUpdate(
                          _id,
                          {
                            rentalname,
                            description,
                            price,
                            quantity,
                          },
                          { new: true }
                        );
                        return rental;
                      } catch (error) {
                        console.error("updateRental :", error);
                        throw error;
                      }
                    }
                  ),
                  deleteRental: requireAuth(
                    "manage_rentals",
                    async (parent, { _id }, context, info) => {
                      //console.log('context:', context)
                      try {
                        const userData = context.user;
                        const userRole = userData.role;
                        console.log("user data and role:", userData, userRole);
                        if (!userData || !userRole) {
                          throw new AuthenticationError("Not authenticated");
                        }
              
                        const rental = await Rental.findByIdAndDelete(_id);
                        return rental;
                      } catch (error) {
                        console.error("deleteRental :", error);
                        throw error;
                      }
                    }
                  ),
            },
        };

        module.exports = rentalResolvers;
 

 
  
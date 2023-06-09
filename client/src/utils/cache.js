import { makeVar, InMemoryCache } from "@apollo/client";
import { GET_ORDER } from "./queries.js";
export const orderItemsVar = makeVar([]);


export const CustomInMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                orderItems:{
                    read() {
                        return orderItemsVar();
                    }
                }
            }
        },
        Mutation: {
            fields: {
              createOrder(_, { args, cache }) {
                // Handle cache updates after the createOrder mutation
                cache.evict({ fieldName: "orderItems" });
      
                return null;
              },
              updateOrder(_, { args, cache }) {
                // Handle cache updates after the updateOrder mutation
                const { id, status } = args;
                const data = cache.readQuery({ query: GET_ORDER });
      
                if (data && data.orderItems) {
                  const updatedItems = data.orderItems.map((item) => {
                    if (item.id === id) {
                      return {
                        ...item,
                        status: status
                      };
                    }
                    return item;
                  });
      
                  cache.writeQuery({
                    query: GET_ORDER,
                    data: { orderItems: updatedItems }
                  });
                }
      
                return null;
              },
              deleteOrder(_, { args, cache }) {
                // Handle cache updates after the deleteOrder mutation
                const { id } = args;
                const data = cache.readQuery({ query: GET_ORDER });
      
                if (data && data.orderItems) {
                  const updatedItems = data.orderItems.filter((item) => item.id !== id);
      
                  cache.writeQuery({
                    query: GET_ORDER,
                    data: { orderItems: updatedItems }
                  });
                }
      
                return null;
              }
            }
          }}
});
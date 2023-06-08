import { makeVar, InMemoryCache } from "@apollo/client";
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
        }
    }
});
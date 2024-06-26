const express = require("express");
const morgan = require("morgan");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware }  = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
const server =  new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log("Apollo Server context called");
    const contextUser = authMiddleware({ req }).user;
    //console.log("Context User:", contextUser); // This should log the user object extracted from the token
    return { user: contextUser };
 
  },
 });
 
// server.applyMiddleware({ app });
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // Use this after the variable declaration
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client/build"))); //potentially comment out if statement
// }

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Handle errors at a higher level
app.use((err, req, res, next) => {
  console.error("Error:", err);
  // Handle error responses to the client
  res.status(err.status || 500).json({ error: err.message });
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};


// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

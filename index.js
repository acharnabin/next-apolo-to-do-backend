const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const BuildSchema = require("./graphql/schemas/BuildSchema");
const RootResolver = require("./graphql/resolvers/RootResolver");
require('dotenv').config()


// require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/nextApploTodo", { useNewUrlParser: true })
  .then(
    console.log("** DB  CONNECTED 🚀**")
  )
  .catch((err) => {
    console.log("** DB NOT CONNECTED **");
    console.log(err);
  });

async function startServer() {
  const server = new ApolloServer({
    typeDefs: BuildSchema,
    resolvers: RootResolver,
    context: ({ req }) => {
       console.log(req.cookies,req.headers) 
      // const token = req.headers.authorization || "";
      // const user = token ? jwt.verify(token, process.env.SECRET_KEY) : null;
      // return { user };
    },
  });

  await server.start();
  const app = express();
  app.use(bodyParser.json(),cors);
//   app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();

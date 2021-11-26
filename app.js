const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://hachiko2k:hachiko2k@cluster0.hyhd7.mongodb.net/cites?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening for requests on PORT ${PORT}.`);
});

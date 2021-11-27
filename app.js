const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

app.use(cors());

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

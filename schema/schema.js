const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;
const _ = require("lodash");
const quotes = require("../books.json");

let authors = [
  { id: 1, name: "Gündüz Vassaf" },
  { id: 2, name: "Victor Hugo" },
  { id: 3, name: "Oscar Wilde" },
  { id: 4, name: "Herman Hesse" },
  { id: 5, name: "Friedrich Nietzsche" },
];

const QuoteType = new GraphQLObjectType({
  name: "Quote",
  fields: () => ({
    id: { type: GraphQLID },
    book: { type: GraphQLString },
    quote: { type: GraphQLString },
    publisher: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return _.filter(quotes, {
          authorId: parent.id,
        });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    quote: {
      type: QuoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(quotes, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return quotes;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

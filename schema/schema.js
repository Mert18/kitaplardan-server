const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const _ = require("lodash");
const Quote = require("../models/quote");
const Author = require("../models/author");

/* 
const quotes = require("../books.json");
*/

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
        return Author.findById(parent.authorId);
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
        return Quote.find({
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
        return Quote.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    quotes: {
      type: new GraphQLList(QuoteType),
      resolve(parent, args) {
        return Quote.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
        });
        return author.save();
      },
    },
    addQuote: {
      type: QuoteType,
      args: {
        authorId: { type: GraphQLID },
        quote: { type: GraphQLString },
        book: { type: GraphQLString },
        publisher: { type: GraphQLString },
      },
      resolve(parent, args) {
        let quote = new Quote({
          quote: args.quote,
          authorId: args.authorId,
          book: args.book,
          publisher: args.publisher,
        });

        return quote.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

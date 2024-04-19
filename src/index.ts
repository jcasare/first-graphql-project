import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "../data.js";
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      // 'parent' here is the resolved Game object
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = { ...args.game, id: Math.floor(Math.random() * 10000) };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    deleteReview(_, args) {
      db.reviews = db.reviews.filter((review) => review.id !== args.id);
      return db.reviews;
    },
    addReview(_, args) {
      let review = { ...args.review, id: Math.floor(Math.random() * 10000) };
      db.reviews.push(review);
      return review;
    },
    updateReview(_, args) {
      db.reviews = db.reviews.map((review) => {
        if (review.id === args.id) {
          return { ...review, ...args.edits };
        }
        return review;
      });
    },
    deleteAuthor(_id, args) {
      db.authors = db.authors.filter((author) => author.id !== args.id);
      return db.authors;
    },
    addAuthor(_, args) {
      let author = { ...args.author, id: Math.floor(Math.random() * 10000) };
      db.authors.push(author);
      return author;
    },
    updateAuthor(_, args) {
      db.authors = db.authors.map((author) => {
        if (author.id === args.id) {
          return { ...author, ...args.edit };
        }
        return author;
      });
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server listening on port, ", 4000);

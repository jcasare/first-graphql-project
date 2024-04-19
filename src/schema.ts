export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform:[String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id:ID!): Game
        authors: [Author]
        author(id:ID!): Author
    }
    type Mutation {
        deleteGame(id:ID!):[Game]
        addGame(game: newGameInput!): Game
        updateGame(id: ID!, edits: EditGameInput!):Game
        deleteAuthor(id:ID!): [Author]
        addAuthor(author:newAuthorInput!):Author
        updateAuthor(id: ID!, edits: EditAuthorInput!): Author
        deleteReview(id:ID!): [Review]
        addReview(author: newAuthorInput!): Review
        updateReview(id: ID!, edits: EditReviewInput!): Review
        
    }
    input newGameInput {
        title: String!,
        platform:[String!]!
    }
    input EditGameInput {
        title: String,
        platform:[String!]
    }
    input newAuthorInput {
        name: String!
        verified: Boolean!
    }
    input EditAuthorInput {
        name: String!
        verified: Boolean!
    }
    input newReviewInput {
        rating: Int!,
        content:String!
    }
    input EditReviewInput {
        rating: Int!
        content: String!
        
    }
`;

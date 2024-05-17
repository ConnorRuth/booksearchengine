const typeDefs = `
    type Book {
        bookId: ID!
        title: String!
        description: String!
        link: String
        image: String
        authors: [String]!
    }

    type User {
        username: String
        email: String
        password: String
        savedBooks: [Book]!

    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, book: String!): User
        deleteBook(userId: ID!, book: String!): User
    }
`;

module.exports = typeDefs;
const typeDefs = `
    type Book {
        bookId: ID!
        title: String!
        description: String
        link: String
        image: String
        authors: [String]
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookToSave {
        bookId: ID!
        title: String!
        description: String
        link: String
        image: String
        authors: [String]
    }
    type Query {
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: BookToSave ): User
        deleteBook( book: String!): User
    }
`;

module.exports = typeDefs;
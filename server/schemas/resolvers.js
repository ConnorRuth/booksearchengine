const { User } = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
          },
    },
    Mutation: {
        addUser: async (parent, {username, email, password} ) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {userId, book} ) => {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { books: book},
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
        },
        deleteBook: async (parent, {userId, book} ) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { books: book } },
                { new: true }
            );
        },
        login: async (parent, {email, password} ) => {
            const user = await User.findOne({email});

            if(!user) {
                throw AuthenticationError;
            }
            const correctPw = await User.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
              }
            
            const token = signToken(user);
            return { token, user };
        }
    }
}


module.exports = resolvers;

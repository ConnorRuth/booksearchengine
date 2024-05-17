const { User } = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
          },
          me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        addUser: async (parent, {username, email, password} ) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {userId, book} ) => {
            if (context.user) {
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
        }
        throw AuthenticationError;
        },
        deleteBook: async (parent, {userId, book} ) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { books: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
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

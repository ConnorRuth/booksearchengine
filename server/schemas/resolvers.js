const { User } = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('books');
          },
          me: async (parent, args, context) => {
            console.log("me request recieved");
   
            if (context.user) {
                console.log(context);
              const user = await User.findById(context.user._id);
              console.log(user);
              return user
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
        saveBook: async (parent, { input}, context ) => {
            if (context.user) {
                console.log(input);
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: { savedBooks: input},
                },
                {
                    new: true,
                    runValidators: true,
                }
            )
        }
        throw AuthenticationError;
        },
        deleteBook: async (parent, { input}, context ) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: input } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
        login: async (parent, {email, password} ) => {
            const user = await User.findOne({email });//add username?

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

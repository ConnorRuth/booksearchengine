import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
query User($userId: ID!) {
  user(userId: $userId) {
    email
    username
    savedBooks {
      bookId
      title
      description
      link
      image
      authors
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
}
`;
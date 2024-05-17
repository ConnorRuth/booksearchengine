import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      books
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      books
    }
  }
`;
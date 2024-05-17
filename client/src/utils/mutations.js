import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($userId: ID!, $book: String!){
    saveBook(userId: $userId, book: $book) {
        _id
        username
        books
    }
}`;

export const DELETE_BOOK =gql`
mutation deleteBook($book: String!) {
    deleteBook(book: $book) {
        _id
        username
        books
    }
}`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
    }
  }
}`;

export const SAVE_BOOK = gql`
mutation SaveBook($input: BookToSave) {
  saveBook(input: $input) {
    bookCount
    username
    savedBooks {
      bookId
      title
    }
  }
}`;

export const DELETE_BOOK =gql`
mutation DeleteBook($userId: ID!, $book: String!) {
  deleteBook(userId: $userId, book: $book) {
    savedBooks {
      bookId
      title
      description
      link
      image
      authors
    }
  }
}`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      email
      savedBooks {
        bookId
        title
      } 
    }
  }
}
`;
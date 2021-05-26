import { gql } from 'apollo-server';

export const typeDefs = gql`
  type File {
    id: String
    filename: String
    storageId: Int
    status: String,
    createdAt: String,
    updatedAt: String,
  }


  type User {
    id: String,
    username: String,
    email: String,
    createdAt: String,
    updatedAt: String,
    profilePictureStorageId: Int,
    nameToPresent: String,
  }

  type AllItems {
    files: [File],
    users: [User],
    totalCount: Int
  }

  type Token {
    token: String,
    refreshToken: String,
    expires: Int,
  }

  enum operations {
    CONTAINS
  }

  input MessageInput {
    key: String,
    value: String,
    operation: operations
  }

  input Pagination {
    itemsNumber: Int,
    page: Int
  }

  type Query {
    files(filter: [MessageInput], pagination: Pagination): AllItems,
    file(id: ID!): File,
    users: [User],
    user(id: ID!): User,
    me: User
  },

  type Mutation {
    # File.
    fileUpdate(id: ID!, filename: String, storageId: Int, status: String): File,

    # User.
    userCreate(username: String, password: String, email: String, nameToPresent: String, profilePictureStorageId: Int): User,
    userUpdate(id: ID!, username: String, password: String, email: String, nameToPresent: String, profilePictureStorageId: Int): User,
    userDelete(id: ID!): Boolean,

    # Auth.
    tokenCreate(username: String, email: String, password: String): Token
    refreshToken(token: String, refreshToken: String): Token,
    revokeToken(id: ID!): Boolean,
  }
`;

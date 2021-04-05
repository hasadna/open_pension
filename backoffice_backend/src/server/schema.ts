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

  type Token {
    token: String,
    refreshToken: String,
    expires: Int,
  }

  type Query {
    files: [File],
    file(id: ID!): File,
    users: [User],
    user(id: ID!): User,
    me: User
  },

  type Mutation {
    # File.
    fileCreate(filename: String, storageId: Int, status: String): File,
    fileUpdate(id: ID!, filename: String, storageId: Int, status: String): File,

    # User.
    userCreate(username: String, password: String, email: String, nameToPresent: String, profilePictureStorageId: Int): User,
    userUpdate(id: ID!, username: String, password: String, email: String, nameToPresent: String, profilePictureStorageId: Int): User,

    # Auth.
    tokenCreate(username: String, email: String, password: String): Token
    refreshToken(token: String, refreshToken: String): Token,
    revokeToken(id: ID!): Boolean,
  }
`;

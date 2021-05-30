import { gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { server } from './server';


export const createTestingServer = () => {
  return createTestClient(server);
}

export const sendQuery = async (graphqlQuery, testingServer) => {
  const {query} = testingServer;
  return await query({ query: graphqlQuery });
};

export const filesQuery = gql`
  query {
    files {
      files {
        filename,
        id,
        status,
        storageId,
        createdAt,
        updatedAt,
      }
    }
  }
`;

export const fileQuery = (fileId: string) => gql`
  query {
    file(id: "${fileId}") {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;

export const fileUpdateQuery = ({id, filename, storageId, status}) => gql`
  mutation {
    fileUpdate(id: "${id}", filename: "${filename}", storageId: ${storageId}, status: "${status}") {
      filename,
      id,
      status,
      storageId,
      createdAt,
      updatedAt,
    }
  }
`;

export const usersQuery = gql`
  query {
    users {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`

export const userQuery = (id) => gql`
  query {
    user(id: "${id}") {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const userCreationQuery = ({username, password, email, nameToPresent = '', profilePictureStorageId = null}) => gql`
  mutation {
    userCreate(username: "${username}", password: "${password}", email: "${email}", nameToPresent: "${nameToPresent}", profilePictureStorageId: ${profilePictureStorageId}) {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const userUpdateQuery = ({id, username, email, password, nameToPresent, profilePictureStorageId}) => gql`
  mutation {
    userUpdate(id: "${id}", username: "${username}", password: "${password}", email: "${email}", nameToPresent: "${nameToPresent}", profilePictureStorageId: ${profilePictureStorageId}) {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const tokenQuery = ({username = '', email = '', password}) => gql`
  mutation {
    tokenCreate(username: "${username}", email: "${email}", password: "${password}") {
      token
      refreshToken
      expires
    }
  }
`

export const refreshTokenQuery = ({token, refreshToken}) => gql`
  mutation {
    refreshToken(token: "${token}", refreshToken: "${refreshToken}") {
      token
      refreshToken
      expires
    }
  }
`

export const revokeTokenQuery = ({id}) => gql`
  mutation {
    revokeToken(id: "${id}")
  }
`;

export const meQuery = () => gql`
  query {
    me {
      id
      username
      email
      nameToPresent
      profilePictureStorageId
    }
  }
`;

export const pagesQuery = gql`
  query  {
    pages {
      id
      label
    }
  }
`;

export const pageQuery = ({id}) => gql`
  query  {
    page(id: "${id}") {
      id
      label
    }
  }
`;

export const pageCreateQuery = ({label}) => gql`
  mutation {
    pageCreate(label: "${label}") {
      id
      label
    }
  }
`;

export const pageUpdateQuery = ({id, label}) => gql`
  mutation  {
    pageUpdate(id: "${id}", label: "${label}") {
      id,
      label
    }
  }
`;

export const pageDeleteQuery = ({id}) => gql`
  mutation  {
    pageDelete(id: "${id}")
  }
`

export const pageHelpersQuery = gql`
  query  {
    pageHelpers {
      pageHelpers {
        id,
        description,
        elementID,
        page {
          id,
          label
        }
      },
      totalCount
    }
  }
`;

export const pageHelperQuery = (id) => gql`
  query  {
    pageHelper(id: "${id}") {
      id,
      description,
      elementID,
      page {
        id,
        label
      }
    },
  }
`;

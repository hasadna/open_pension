import {gql} from "apollo-server";

export const queryUsers = gql`
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
export const userCreationQuery = ({
                                    username,
                                    password,
                                    email,
                                    nameToPresent = '',
                                    profilePictureStorageId = null
                                  }) => gql`
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
export const userUpdateQuery = ({
                                  id,
                                  username,
                                  email,
                                  password,
                                  nameToPresent,
                                  profilePictureStorageId
                                }) => gql`
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

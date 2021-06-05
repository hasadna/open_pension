import {gql} from "apollo-server";

export const queryFiles = gql`
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

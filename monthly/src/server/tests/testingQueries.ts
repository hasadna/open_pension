import {gql} from "apollo-server";

export const channelsQuery = gql`
  query {
    channels {
      ID
      label
    }
  }
`;

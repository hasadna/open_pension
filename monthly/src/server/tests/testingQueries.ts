import {gql} from "apollo-server";

export const channelsQuery = gql`
  query {
    channels {
      ID
      label
    }
  }
`;

export const subChannelQuery = gql`
  query {
    subChannels {
      ID
      label
    }
  }
`;

export const fundsQuery = gql`
  query {
    fundNames {
      ID
      label
    }
  }
`;

export const mangingBodyQuery = gql`
  query {
    managingBodies {
      ID
      label
    }
  }
`;

export const lastUpdateQuery = gql`
  query {
    lastUpdated
  }
`;

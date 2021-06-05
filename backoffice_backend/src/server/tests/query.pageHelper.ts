import {gql} from "apollo-server";

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
export const pageHelperCreateQuery = ({page, description, elementID}) => gql`
  mutation {
    pageHelperCreate(page: "${page}", description: "${description}", elementID: "${elementID}") {
      id
      description
      elementID
      page {
        id
        label
      }
    }
  }
`;
export const pageHelperUpdateQuery = ({id, page, description, elementID}) => gql`
  mutation {
    pageHelperUpdate(id: "${id}", page: "${page}", description: "${description}", elementID: "${elementID}") {
      id
      description
      elementID
      page {
        id
        label
      }
    }
  }
`;
export const pageHelperDeleteQuery = (id) => gql`
  mutation {
    pageHelperDelete(id: "${id}")
  }
`;

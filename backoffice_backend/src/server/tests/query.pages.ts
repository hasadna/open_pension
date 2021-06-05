import {gql} from "apollo-server";

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

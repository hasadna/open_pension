import {gql} from "apollo-server";

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

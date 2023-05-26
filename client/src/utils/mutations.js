import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
            email
        }
    }
`;

import { gql } from '@apollo/client';

export const SEARCH_GIFS_QUERY = gql`
    query SearchGifs($searchTerm: String!) {
        gifs(searchTerm: $searchTerm) {
            id
            url
            title
        }
    }
    `;

import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query Query {
        me {
            _id
            firstName
            lastName
            username
            email
        }
    }
`;

export const QUERY_PRODUCTS = gql`
    query Products {
        products {
            productName
            createdAt
            color
            image
            price
            sale
        }
    }
`;

export const GET_ONE_PRODUCT = gql`
    query GetOneProduct($id: ID!) {
        getOneProduct(_id: $id) {
            _id
            productName
            description
            image
            price
            sale
            gender
            size
            color
            countInStock
            reviews {
                user {
                    _id
                }
                rating
                comment
                createdAt
            }
            totalRating
            numberReviews
            category {
                _id
                name
            }
        }
    }
`;

export const PRODUCTS_BY_CATEGORYID = gql`
    query ProductsByCategoryID($categoryId: ID) {
        productsByCategoryID(categoryID: $categoryId) {
            _id
            productName
            description
            image
            price
            sale
            gender
            size
            color
            countInStock
            reviews {
                user {
                    _id
                }
                rating
                comment
                createdAt
            }
            totalRating
            numberReviews
            category {
                _id
            }
        }
    }
`;

export const QUERY_CATEGORY = gql`
    query Categories {
        categories {
            _id
            name
        }
    }
`;

// export const QUERY_ORDER = gql`

// `;

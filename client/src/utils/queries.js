import { gql } from '@apollo/client';

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

export const GET_ONE_PRODUCT = gql`
query GetOneProduct($id: ID!) {
    getOneProduct(_id: $id) {
      _id
      productName
      description
      image
      price
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

export const QUERY_MYPRODUCTS = gql`
query GetMyProducts($userId: ID!) {
  getMyProducts(userID: $userId) {
    _id
    price
    productName
    countInStock
    color
    image
    size
  }
}
`;
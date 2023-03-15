import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
        token
        }
    }
`;

export const ADD_PRODUCT = gql`
mutation AddProduct($productsByCategory: ID!, $productData: productInput!, $userId: ID!) {
    addProduct(productsByCategory: $productsByCategory, productData: $productData, userId: $userId) {
        _id
        productName
        description
        image
        price
        discount
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
        }
        totalRating
        numberReviews
        }
    }
`;

export const REMOVE_PRODUCT = gql`
    mutation RemoveProduct($productId: ID!) {
        removeProduct(productId: $productId) {
        _id
        }
    }
`;
// updates product only (not reviews)
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($productsByCategory: ID!, $productId: ID!, $productData: productInput!) {
    updateProduct(productsByCategory: $productsByCategory, productId: $productId, productData: $productData) {
      productName
      description
      image
      price
      discount
      gender
      size
      color
      countInStock
      totalRating
      numberReviews
    }
  }
`;

export const UPDATE_USER = gql`
    mutation Mutation($userId: ID!, $accountData: userInput!) {
  updateUser(userId: $userId, accountData: $accountData) {
    email
    firstName
    lastName
    username
  }
}
`;

export const REMOVE_USER = gql`
    mutation Mutation($userId: ID!) {
        removeUser(userId: $userId) {
        _id
        }
    }
`;

export const EDIT_ORDER = gql`
    mutation Mutation($orderId: ID!, $orderData: orderInput!) {
        updateOrder(orderId: $orderId, orderData: $orderData) {
        _id
        deliveryDate
        isDelivered
        }
    }
`;

export const ADD_ORDER = gql`
    mutation AddOrder($userId: ID!, $orderData: orderInput!) {
        addOrder(userId: $userId, orderData: $orderData) {
        _id
        isPaid
        products {
            _id
        }
        shippingAddress {
            city
            phoneNumber
            state
            street
            zip
        }
        shippingPrice
        tax
        totalCost
        purchaseDate
        deliveryDate
        isDelivered
        }
    }
    
`;


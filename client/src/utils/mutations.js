import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation Mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export const ADD_USER = gql`
	mutation Mutation(
		$firstName: String!
		$lastName: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			firstName: $firstName
			lastName: $lastName
			username: $username
			email: $email
			password: $password
		) {
			token
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser(
		$userId: ID!
		$firstName: String
		$lastName: String
		$email: String
		$username: String
	) {
		updateUser(
			userId: $userId
			firstName: $firstName
			lastName: $lastName
			email: $email
			username: $username
		) {
			_id
			firstName
			lastName
			username
			email
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

export const ADD_PRODUCT = gql`
	mutation AddProduct(
		$productsByCategory: ID!
		$productData: productInput!
		$userId: ID!
	) {
		addProduct(
			productsByCategory: $productsByCategory
			productData: $productData
			userId: $userId
		) {
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
		}
	}
`;

// updates product only (not reviews)
export const UPDATE_PRODUCT = gql`
	mutation UpdateProduct(
		$productsByCategory: ID!
		$productId: ID!
		$productData: productInput!
	) {
		updateProduct(
			productsByCategory: $productsByCategory
			productId: $productId
			productData: $productData
		) {
			productName
			description
			image
			price
			discount
			gender
			size
			color
			countInStock
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

export const ADD_REVIEW = gql`
	mutation AddReview(
		$userId: ID!
		$productId: ID!
		$reviewData: reviewInput!
	) {
		addReview(
			userId: $userId
			productId: $productId
			reviewData: $reviewData
		) {
			_id
			comment
			rating
			createdAt
			numberReviews
			product {
				_id
			}
			user {
				_id
			}
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

export const EDIT_ORDER = gql`
	mutation Mutation($orderId: ID!, $orderData: orderInput!) {
		updateOrder(orderId: $orderId, orderData: $orderData) {
			_id
			deliveryDate
			isDelivered
		}
	}
`;

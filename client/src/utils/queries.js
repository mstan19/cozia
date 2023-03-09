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
			_id
			productName
			createdAt
			color
			image
			price
			discount
			totalRating
			numberReviews
			gender
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
			discount
		}
	}
`;

export const QUERY_ALLORDERS = gql`
	query GetAllOrders($userId: ID!) {
		getAllOrders(userID: $userId) {
			_id
			deliveryDate
			isDelivered
			purchaseDate
			totalCost
			shippingAddress {
				street
				city
				zip
				state
			}
			products {
				_id
				productName
				gender
				color
				discount
				size
				price
			}
		}
	}
`;

export const QUERY_SALEITEMS = gql`
	query Query($userId: ID!) {
		getSaleItems(userID: $userId)
	}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($orderID: ID!) {
    checkout(orderID: $orderID) {
      session
    }
  }
`;

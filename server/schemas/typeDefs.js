const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        isSeller: Boolean!
        orders: [Order]
    }

    type Category {
        _id: ID!
        name: String!
      }

    type Reviews {
        user: User!
        rating: Float!
        comment: String!
        timestamps: DateTime
    }

    type Product {
        _id: ID!
        productName: String!
        description: String
        image: String
        price: Float!
        sizes: String
        countInStock: Int
        inStock: Boolean!
        reviews: [Reviews]
        totalRating: Int
        numberReviews: Int
        category: Category!
      }

    type ShippingAddress {
        street: String!
        city: String!
        zip: String!
        country: String!
    }

    type IndividualOrder {
        productName: String!
        image: String!
        quantity: String!
        price: Float!
        product: [Product]
    }

    type Order {
        _id: ID
        user: User!
        shippingAddress: ShippingAddress!***
        individualOrder: IndividualOrder!***
        tax: Int!
        shippingPrice: Int!
        isPaid: Boolean!
        isDelivered: Boolean!
        totalCost: Int!
        purchaseDate: String
        deliveryDate: String
    }
    
    type Auth {
        token: ID!
        user: User
      }

    type Checkout {
        session: ID
    }
    
    type Query {
        me: User
        user: User
        categories: [Category]
        products(category: ID, productName: String): [Product]
        product(_id: ID!): Product
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
      }

    input InputShippingAddress {
        street: String!
        city: String!
        zip: String!
        country: String!
    }

    input InputProduct {
        productName: String!
        description: String
        image: String
        price: Float!
        sizes: String
        countInStock: Int
        inStock: Boolean!
        reviews: [Reviews]
        totalRating: Int
        numberReviews: Int
        category: Category!
      }

      input InputReviews {
        user: User!
        rating: Float!
        comment: String!
        timestamps: DateTime
    }

    type Mutation{ 
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, password: String): User

        addProduct(input: InputProduct!): Product
        updateProduct(_id: ID!, input: InputProduct!): Product
        removeProduct(_id: ID!): Product

        addReview(input: InputReviews): Product
        updateReview(_id: ID!, input: InputReviews): Product

        addOrder(products: [ID]!): Order
        updateOrder(_id: ID!, input: InputShippingAddress): Order
        removeOrder(_id: ID!): Order
    }

`;

module.exports = typeDefs;

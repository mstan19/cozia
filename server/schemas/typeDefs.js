const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
    }

    type Category {
        _id: ID!
        name: String!
    }

    type Reviews {
        user: User!
        rating: Float!
        comment: String!
        createdAt: String
    }

    type Product {
        _id: ID!
        productName: String!
        description: String
        image: String
        price: Float!
        discount: Float
        gender: String!
        size: String
        color: String!
        countInStock: Int
        reviews: [Reviews]
        totalRating: Int
        numberReviews: Int
        category: Category!
        user: User!
    }

    type ShippingAddress {
        street: String!
        city: String!
        zip: String!
        state: String!
        country: String!
    }

    type productOrder {
        productName: String!
        image: String!
        quantity: String!
        price: Float!
        discount: Float
        product: [Product]
    }

    type Order {
        _id: ID
        user: User!
        shippingAddress: ShippingAddress!
        productOrder: productOrder!
        tax: Int!
        shippingPrice: Int!
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

    #Queries
    type Query {
        me: User
        getMyProducts(userID: ID!): [Product]
        categories: [Category]
        productsByCategoryID(categoryID: ID): [Product]
        getOneProduct(_id: ID!): Product
        order(_id: ID!): Order
    }

    #Inputs
    input reviewInput {
        rating: Float!
        comment: String!
        createdAt: String
    }

    input CategoryInput {
        name: String
    }
    input userInput {
        email: String
    }

    input productInput {
        productName: String!
        description: String
        image: String
        price: Float
        discount: Float
        size: String
        gender: String
        color: String
        countInStock: Int
        reviews: [reviewInput]
        totalRating: Int
        numberReviews: Int
        category: CategoryInput
        user: userInput
    }

    #Mutation

    type Mutation {
        requirePassword( password: String!): Auth
        login(email: String!, password: String!): Auth
        addUser(
            firstName: String!
            lastName: String!
            username: String!
            email: String!
            password: String!
        ): Auth
        updateUser(
            userId: ID!
            firstName: String
            lastName: String
            email: String
            username: String
        ): User
        removeUser(userId: ID!): User
        addProduct(productsByCategory: ID!, productData: productInput!): Product
        removeProduct(productId: ID!): Product
        updateProduct(
            productsByCategory: ID!
            productId: ID!
            productData: productInput!
        ): Product
    }
`;

module.exports = typeDefs;

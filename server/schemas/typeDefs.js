const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const typeDefs = gql`
    scalar DateTime

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

    type Review {
        _id: ID!
        user: User!
        rating: Float!
        comment: String!
        createdAt: DateTime
        totalRating: Float!
        numberReviews: Int
        product: Product!
    }

    type Product {
        _id: ID!
        productName: String!
        description: String
        image: String
        price: Float!
        discount: Float!
        gender: String!
        size: String
        color: String!
        countInStock: Int
        createdAt: DateTime
        review: Review
        category: Category!
        user: User!
    }

    type ShippingAddress {
        street: String!
        city: String!
        zip: String!
        state: String!
        phoneNumber: String!
    }

    type productOrder {
        productName: String!
        image: String!
        quantity: String!
        price: Float!
        discount: Float!
        product: [Product]
    }

    type Order {
        _id: ID
        user: User!
        shippingAddress: ShippingAddress!
        products: [Product]
        tax: Int!
        shippingPrice: Int!
        isDelivered: Boolean
        isPaid: Boolean!
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
        getUser(_id: ID!): User
        getAllUsers: [User]
        products: [Product]
        productsByCategoryID(categoryID: ID): [Product]
        getOneProduct(_id: ID!): Product
        reviews: [Review]
        getReviewsByProduct(productID: ID): [Review]
        getOneOrder(_id: ID!): Order
        getAllOrders(userID: ID!): [Order]
        getSaleItems(userID: ID!): String
        checkout(orderID: ID!): Checkout
    }

    #Inputs
    input reviewInput {
        rating: Float!
        comment: String!
        createdAt: String
        totalRating: Float!
        numberReviews: Int
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
        discount: Float!
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
    input shippingAddressInput {
        street: String!
        city: String!
        zip: String!
        state: String!
        phoneNumber: String
    }

    input orderInput {
        tax: Int
        products: [ID]
        shippingAddress: shippingAddressInput
        shippingPrice: Int
        isDelivered: Boolean
        isPaid: Boolean
        totalCost: Int
        purchaseDate: String
        deliveryDate: String
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
        addProduct(productsByCategory: ID!, productData: productInput!, userId: ID!): Product
        removeProduct(productId: ID!): Product
        updateProduct(
            productsByCategory: ID!
            productId: ID!
            productData: productInput!
        ): Product
        updateOrder(
            orderId: ID!
            orderData: orderInput!
        ): Order
        addOrder(
            userId: ID!
            orderData: orderInput!
        ): Order
    }
`;

const dateTimeScalar = new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    }
});

module.exports = typeDefs;

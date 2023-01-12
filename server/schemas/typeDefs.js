const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        isSeller: Boolean!
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

    type productOrder {
        productName: String!
        image: String!
        quantity: String!
        price: Float!
        product: [Product]
    }

    type Order {
        _id: ID
        user: User!
        shippingAddress: ShippingAddress!
        productOrder: productOrder!
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
   
    #Queries
    type Query {
        me: User
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

      input productInput {
        productName: String!
        description: String
        image: String
        price: Float
        sizes: String
        countInStock: Int
        inStock: Boolean
        reviews: [reviewInput]
        totalRating: Int
        numberReviews: Int
        category: CategoryInput
      }

      #Mutation

      type Mutation{ 
          login(email: String!, password: String!): Auth
          addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
          updateUser(firstName: String, lastName: String, email: String, password: String): User
          addProduct(productsByCategory: ID!, productData: productInput!): Product
          removeProduct(productId: ID!): Product
          updateProduct(productsByCategory: ID!, productId: ID!, productData: productInput!): Product
        
      }
`;

module.exports = typeDefs;

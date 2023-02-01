import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register/Register";
import MyProduct from "./pages/MyProducts/MyProducts";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Header/Navbar";
import AddProductForm from "./components/AddProductForm";
import OrderList from "./pages/OrderList/OrderList";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: "/graphql"
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="page-container" data-testid="page-container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orderlist" element={<OrderList />} />
                        <Route path="/addproduct" element={<AddProductForm />} />
                        <Route path="/myproducts" element={<MyProduct />} />
                    </Routes>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;



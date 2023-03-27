const express = require("express");
const path = require("path");
const db = require("./config/connection");
// getting apollo server
const { ApolloServer } = require("apollo-server-express");

// auth middleware TODO write middleware
const { authMiddleware } = require("./utils/auth");
// geting typeDefs and resolvers from schemas
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
    // formatError: (err) => {
    //   console.error(err);
    //   return err;
    // },
});
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.use(routes);
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(
                `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
            );
        });
    });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

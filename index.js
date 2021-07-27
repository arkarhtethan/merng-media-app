const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const Post = require('./models/Post');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen()
            .then(res => {
                console.log(`Server running at ${res.url}`)
            }).catch(err => {
                console.log(err.message);
            })
    })


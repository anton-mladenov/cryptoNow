
const { ApolloServer } = require('apollo-server-express')
const express = require("express")
const { typeDefs } = require("./schema/types")
const { resolvers } = require("./schema/resolvers")

const app = express()
const port = 4000

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.applyMiddleware({app})

app.listen(port, () => {
	console.log(`🚀 Server ready at ${server.graphqlPath}`)
})

// http://localhost:4000/graphql?query={coin{rate}}
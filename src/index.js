
const express = require("express")
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require("./schema/types")
const { resolvers } = require("./schema/resolvers")
const bodyParser = require("body-parser")
const router = require("./routes")

const app = express()
const port = 4000
const encodedBodyParser = bodyParser.urlencoded({ extended: false })

app.use(encodedBodyParser)

app.use("/coinprice", router) 

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.applyMiddleware({app})

app.listen(port, () => {
	console.log(`🚀 Server ready at ${server.graphqlPath}`)
})

// http://localhost:4000/graphql?query={coin(name:"ETH"){rate time}} - that's a URL query string version of calling a graphql query over http

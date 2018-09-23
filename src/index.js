
const cors = require("cors")
const express = require("express")
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require("./schema/types")
const { resolvers } = require("./schema/resolvers")
const bodyParser = require("body-parser")
const router = require("./routes")

const app = express()
const port = 4000
const encodedBodyParser = bodyParser.urlencoded({ extended: false })

// app.use(cors())
app.use(encodedBodyParser)

app.use("/coinprice", router)

// app.post("/graphql", encodedBodyParser, (req, res, next) => {
//     console.log("REQ BODY: ", req.body)
//     next()
// }) 

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.applyMiddleware({app})

app.listen(port, () => {
	console.log(`🚀 Server ready at ${server.graphqlPath}`)
})

// http://localhost:4000/graphql?query={coin(name:"ETH"){rate time}}

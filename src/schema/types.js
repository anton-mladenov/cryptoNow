const { gql } = require('apollo-server-express')

const typeDefs = gql`

interface BasicCoinInfo {
	rate: Float
}

type Query {
	coin(name: String): Coin
	#coin: Coin
}

type Coin implements BasicCoinInfo {
	rate: Float
	asset_id_base: String
	asset_id_quote: String
	time: String
}

`
module.exports = { typeDefs }
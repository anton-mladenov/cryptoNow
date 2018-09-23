const request = require("superagent")
const { baseUrl } = require("../constants")

const resolvers = {
	Query: {
		coin: async (obj, args, context, info) => {
			let coin = args.name ? args.name : ""
			let coinInfoRequest = await request
				.get(`${baseUrl}/v1/exchangerate/${coin}/USD`)
				// .get(`${baseUrl}/v1/exchangerate/BTC/USD`)
				.set("Accept", "application/json")
				.set("X-CoinAPI-Key", "5A8FC430-49B3-4605-9A41-6D472847AE30")
				.set("Accept-Encoding", "deflate, gzip")

			return coinInfoRequest.body
		},
	}
}

module.exports = { resolvers }

const baseUrl = "rest.coinapi.io"

const queryURL = (coin) => {
    return `http://0f37e0f7.eu.ngrok.io/graphql?query={coin(name:"${coin}"){rate}}`
}

module.exports = { baseUrl, queryURL }
const express = require("express")
const bodyParser = require("body-parser")
const request = require("superagent")
const { baseUrl } = require("./constants")

const encodedBodyParser = bodyParser.urlencoded({ extended: true })

const router = express.Router()

router.post("/", encodedBodyParser, async (req, res) => {
    console.log("REQ BODY: ", req.body, typeof req.body.text)
    res.status(200)
    let coin = req.body.text.split(".")[0]
    console.log("Coin: ", typeof coin, coin)
    let coinPrice = await request
        .get(`http://0f37e0f7.eu.ngrok.io/graphql?query={coin(name:"${coin}"){rate}}`)
        .catch(err => {
            if (err.status === 500) {
                console.log("___500 Error from postMessage func: ", err.status, err.response.text)
                return "Error from postMessage func"
            }
            else {
                console.error( "__ error status:__ ", err.status, "___only err:__ ", err.response.text)
            }
        })
    console.log("CoinPrice:____: ", typeof coinPrice, Object.keys(coinPrice.body))
    await res.send({"text": `The price of ${coin} right now is ${coinPrice.body.data.coin.rate.toFixed(2)}`})
    res.end()
}) 

module.exports = router
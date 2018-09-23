const express = require("express")
const bodyParser = require("body-parser")
const request = require("superagent")
const { queryURL } = require("./constants")

const encodedBodyParser = bodyParser.urlencoded({ extended: true })

const router = express.Router()

router.post("/", encodedBodyParser, async (req, res) => {
    // console.log("REQ BODY: ", req.body)
    res.status(200)

    let coin = req.body.text.toUpperCase()

    let coinPrice = await request
        .get(queryURL(coin))
        .catch(err => {
            if (err.status === 500) {
                console.log("___500 Error from postMessage func: ", err.status, err.response.text)
                return "Error from postMessage func"
            }
            else {
                console.error( "__ error status:__ ", err.status, "___only err:__ ", err.response.text)
            }
        })

    let coinPriceExtracted = coinPrice.body.data.coin.rate.toFixed(2)

    res.send({"text": `The price of ${coin} right now is ${coinPriceExtracted}`}).end()
}) 

module.exports = router
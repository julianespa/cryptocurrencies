import express from "express"
import axios from "axios"

const app = express()
const PORT = 3000
const APIurl = "https://api.blockchain.com/v3/exchange/tickers/"

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.post("/", async (req,res)=>{
    try {
        const result = await axios.get(APIurl + req.body.symbol)
        res.render("index.ejs", {data: result.data})
    } catch (error) {
        res.render("index.ejs", {error: error.response.data})
    }
})

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))
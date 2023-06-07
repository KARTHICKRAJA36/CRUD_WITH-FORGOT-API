const express = require("express")
const app = express()
const Database = require("./config/database")
const bodyParser = require("body-parser")
const router = require("./router/router")


app.use(express.json());
app.use(bodyParser.json());
app.use(router)
app.listen(3300, () => {
    console.log("port running at 3300...");
})

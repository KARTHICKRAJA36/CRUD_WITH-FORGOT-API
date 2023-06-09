const express = require("express")
const app = express()
const Database = require("./config/database")
const bodyParser = require("body-parser")
const router = require("./router/router")
const globalerrorhandle = require("./controllers/globalerror")


app.use(express.json());
app.use(bodyParser.json());
app.use(router)

app.all('*', (req, res, next) => {
    const err = new Error('cannot find the ${req.originalUrl} in the server');
    err.status = 'failure';
    err.statuscode = 404;

    next(err);

})
app.use(globalerrorhandle)

app.listen(3300, () => {
    console.log("port running at 3300...");
})

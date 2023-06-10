const jswn = require("jsonwebtoken");
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require("../controllers/customerror")
let checktoken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jswn.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) {
                const err = new customerrorhandle(500, errors.WrongToken)
                next(err)
                return;
            }
            else {
                req.id = decoded.id
                next();
            }


        })

    }
    else {
        const err = new customerrorhandle(401, errors.Tokenmiss)
        next(err);
    }
}
module.exports = checktoken;

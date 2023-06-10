const Users = require("../model/User")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require("../controllers/customerror")
const fileupload = async (req, res, next) => {

  const id = req.params.id
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      const err = new customerrorhandle(404, errors.notFound)
      next(err)
    }

    await user.update({
      Resume: req.file ? req.file.filename : user.Resume
    })
    res.status(200).json({
      status: responses.success,
      message: responses.file,
      data: req.file.filename
    });
  }
  catch (error) {
    console.error(error);
    const err = new customerrorhandle(500, error.message)
    next(err)
  }

}
module.exports = fileupload
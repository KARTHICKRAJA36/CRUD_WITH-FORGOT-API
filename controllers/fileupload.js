const Users = require("../model/User")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const fileupload = async (req, res) => {

  const id = req.params.id
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: errors.failure,
        message: errors.notFound,
      });
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
    // res.status(500).json({ message: error.message });
    res.status(500).json({
      status: errors.failure,
      message: error.message,
    });
  }

}
module.exports = fileupload
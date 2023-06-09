const Users = require("../model/user")
const Qualifications = require("../model/Qualification")
const Addresses = require("../model/address")
const errors = require("../Messages/Error")
const responses = require("../Messages/Response")
const customerrorhandle = require("../controllers/customerror")
class deletecontrol {
  static async deleteUserWithQualificationAndAddress(req, res, next) {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await Users.findByPk(id);
      if (!user) {
        // return res.status(404).json({
        //   status: errors.failure,
        //   message: errors.notFound,
        // });
        const err = new customerrorhandle(404, errors.notFound)
        next(err)
      }

      // Find the qualification by userId
      const qualification = await Qualifications.findOne({ where: { userId: id } });
      if (!qualification) {
        // return res.status(404).json({
        //   status: errors.failure,
        //   message: errors.notFound,
        // });
        const err = new customerrorhandle(404, errors.notFound)
        next(err)
      }

      // Find the address by userId
      const address = await Addresses.findOne({ where: { userId: id } });
      if (!address) {
        // return res.status(404).json({
        //   status: errors.failure,
        //   message: errors.notFound,
        // });
        const err = new customerrorhandle(404, errors.notFound)
        next(err);
      }

      // Delete the user, qualification, and address details of user
      await user.destroy();
      await qualification.destroy();
      await address.destroy();


      res.status(200).json({
        status: responses.success,
        message: responses.delete
      });
    } catch (error) {
      console.error(error);
      // res.status(404).json({
      //   status: errors.failure,
      //   message: error.message,
      // });
      const err = new customerrorhandle(404, error)
      next(err)
    }
  }
}

module.exports = deletecontrol;
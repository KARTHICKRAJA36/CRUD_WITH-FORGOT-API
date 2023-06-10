const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/User');
const Tokens = require('../model/Token');
const sendEmail = require('../utils/email/sendemail');
const customerrorhandle = require("../controllers/customerror")
const errors = require('../Messages/Error')

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            const err = new customerrorhandle(404, errors.notFound)
            next(err)
        }

        const token = jwt.sign({ userId: user.id }, 'mysceretkey');

        await Tokens.create({ token, userId: user.id });

        const resetLink = `http://localhost:3300/reset-password?token=${token}`;

        const emailText = `
        <h1>Password Reset Request</h1>
        <p>Hello ${user.username} ,</p>
        <p>We received a request to reset your password for your account. To proceed with the password reset, please click on the following link:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not initiate this request, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you,</p>
        <p>${user.company_name}</p>
        `;

        await sendEmail(user.email, 'Password Reset Request', emailText);

        res.json({
            status: 'success',
            message: 'Password reset link sent to your email',
            Token: token
        });
    } catch (error) {
        console.error(error);
        const err = new customerrorhandle(404, error.message)
        next(err)
    }
};

const resetPassword = async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
        const tokenRecord = await Tokens.findOne({ where: { token } });

        if (!tokenRecord) {
            const err = new customerrorhandle(404, errors.WrongToken)
            next(err)
        }

        const user = await Users.findOne({ where: { id: tokenRecord.userId } });

        if (!user) {
            const err = new customerrorhandle(404, errors.notFound)
            next(err)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        await tokenRecord.destroy();

        res.json({
            status: "success",
            message: 'Password reseted successfully'
        });
    } catch (error) {
        console.error(error);
        const err = new customerrorhandle(500, error.message)
        next(err)
    }
};


module.exports = {
    forgotPassword,
    resetPassword,
};

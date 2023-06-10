const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/User');
const Tokens = require('../model/Token');
const sendEmail = require('../utils/email/sendemail');

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ userId: user.id }, 'mysceretkey');

        await Tokens.create({ token, userId: user.id });

        const resetLink = `http://localhost:3300/reset-password?token=${token}`;

        const emailText = `
      Hello ${user.username},
      
      You have requested to reset your password. Please click the link below to proceed:
      ${resetLink}
      
      If you did not request this, please ignore this email.
      
      Best regards,
      Your App
    `;

        await sendEmail(user.email, 'Password Reset Request', emailText);

        res.json({
            message: 'Password reset link sent to your email',
            Token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const tokenRecord = await Tokens.findOne({ where: { token } });

        if (!tokenRecord) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        const user = await Users.findOne({ where: { id: tokenRecord.userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        await tokenRecord.destroy();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


module.exports = {
    forgotPassword,
    resetPassword,
};

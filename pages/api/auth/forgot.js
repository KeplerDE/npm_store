import nc from 'next-connect';
import { validateEmail } from '../../../utils/validation';
import { connectDb, disconnectDb } from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { createActivationToken, createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';

const handler = nc();

handler.post(async (req, res) => {  
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
    await sendEmail(email, url, "", "Activate your account.", resetEmailTemplate);
    await disconnectDb();
    res.json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    await disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
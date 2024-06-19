// pages/api/auth/signup.js

import nc from 'next-connect';
import { validateEmail } from '../../../utils/validation';
import { connectDb, disconnectDb } from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { createActivationToken } from '../../../utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { activateEmailTemplate } from '@/emails/activateEmailTemplate';

const handler = nc();

handler.post(async (req, res) => {
  try {
    await connectDb();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exists." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    await sendEmail(email, url, "", "Activate your account!", activateEmailTemplate);

    // Automatically sign in the user
    const session = await getSession({ req });
    await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `${process.env.BASE_URL}/profile`,
    });

    await disconnectDb();

    res.status(200).json({ message: 'Register success! Please activate your email to start.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;

import nc from 'next-connect';
import { connectDb, disconnectDb } from '../../../utils/db';
import User from '../../../models/User';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';

const handler = nc();

handler.post(async (req, res) => {  
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      await disconnectDb();
      return res.status(400).json({ message: "This email does not exist." });
    }

    const currentTime = Date.now();
    const emailInterval = 24 * 60 * 60 * 1000; // 24 hours

    if (user.lastEmailSent && currentTime - new Date(user.lastEmailSent).getTime() < emailInterval) {
      await disconnectDb();
      return res.status(200).json({ message: "An email has already been sent to this address. Please check your inbox." });
    }

    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

    await sendEmail(email, url, "", "Reset your password", resetEmailTemplate);

    // Update the last email sent time
    user.lastEmailSent = new Date(currentTime);
    await user.save();

    await disconnectDb();
    res.status(200).json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    await disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;

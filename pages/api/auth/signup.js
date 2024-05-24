import nc from 'next-connect';
import { connectDb } from '../../../utils/db'; 


const handler = nc();

handler.post(async (req, res) => {
  try {
    await connectDb(); // Подключение к базе данных
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Логика для создания нового пользователя в базе данных
    // Пример:
    // const newUser = new User({ name, email, password });
    // await newUser.save();

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;

import dbConnect from "@/utils/dbConnect"; // Убедитесь, что у вас есть этот файл для подключения к базе данных
import User from "@/models/User"; // Импорт модели пользователя
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(400).json({ message: "User ID and password are required." });
        }

        await dbConnect();

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.findByIdAndUpdate(user_id, {
                password: hashedPassword,
            });

            res.status(200).json({ message: "Password reset successful!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}

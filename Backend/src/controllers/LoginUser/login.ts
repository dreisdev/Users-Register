import configDotenv from "../../utils/dotEnv";
import { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userSchema";


configDotenv();

const LoginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ mensagem: 'Email incorreto' });


        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {

            return res.status(401).json({ mensagem: 'Senha incorreta' });

        }

        const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY_JWT}`, { expiresIn: '1h' });

        const userId = user._id

        res.status(200).json({ mensagem: "Login bem sucedido", token, userId });


    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');

    }

}

export {
    LoginUser
}
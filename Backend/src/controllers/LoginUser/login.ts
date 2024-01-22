import configDotenv from "../../utils/dotEnv";
import { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/userSchema";


configDotenv();

const LoginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {


        console.log('Email recebido:', email);

        const user = await User.findOne({ email });

        console.log('Usuário encontrado:', user);

        if (!user) {
            return res.status(401).json({ mensagem: 'Email incorreto' });


        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {

            return res.status(401).json({ mensagem: 'Senha incorreta' });

        }

        const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY_JWT}`, { expiresIn: '1h' });

        res.status(200).json({ mennsagem: "Login bem sucedido", token });


    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');

    }

}

export {
    LoginUser
}
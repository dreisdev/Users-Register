import { Request, Response } from "express";
import User from "../../models/userSchema";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';




const GetAllPerssons = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const tokenFromHeader = req.header('Authorization');

        if (!tokenFromHeader || !tokenFromHeader.startsWith('Bearer ')) {
            return res.status(401).json({ mensagem: 'Token não fornecido' });
        }

        const token = tokenFromHeader.split(' ')[1];

        const decoded = jwt.verify(token, `${process.env.SECRET_KEY_JWT}`) as { userId: string };

        if (decoded.userId !== userId) {


            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        const filter = { _id: new mongoose.Types.ObjectId(userId) };

        try {
            const existingPersons = await User.findOne(filter);

            if (!existingPersons) {
                return res.status(404).json({ mensagem: 'Não há pessoas física cadastradas para o usuário.' });
            }

            res.status(200).json({
                mensagem: `Pessoa físicas do Usuário ${existingPersons.username}`,
                UserPersons: existingPersons,
            });


        } catch (error) {

            console.error(error);

            return res.status(500).json({ mensagem: `Erro MongoDB ${error}` });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
}

export { GetAllPerssons };
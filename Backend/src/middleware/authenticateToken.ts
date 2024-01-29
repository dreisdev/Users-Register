import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { IUser } from '../@types/models';

interface CustomRequest extends Request {
    user?: IUser
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido em autheticateToken' });
    }

    try {
        const decoded = jwt.verify(token, `${process.env.SECRET_KEY_JWT}`) as IUser;
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({ mensagem: 'Sessão Expirada - Efetue um novo Login.' });


    }
}
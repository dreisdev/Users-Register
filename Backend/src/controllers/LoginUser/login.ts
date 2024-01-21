import { Request, Response } from "express";

const LoginUser = async (req: Request, res: Response) => {

    res.status(201).json({ mensagem: 'Estrutura Inicial do endpoint de Login' })

}

export {
    LoginUser
}
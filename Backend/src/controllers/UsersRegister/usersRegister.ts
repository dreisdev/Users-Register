import { Request, Response } from "express";

const UsersRegister = async (req: Request, res: Response) => {

    res.status(201).json({ mensagem: 'Estrutura Inicial do endpoint de Cadastro de Usuário' })

}

export {
    UsersRegister
}
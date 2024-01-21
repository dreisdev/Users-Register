import { Request, Response } from "express";

const ContactsRegister = async (req: Request, res: Response) => {

    res.status(201).json({ mensagem: 'Estrutura Inicial do endpoint de Cadastro de Pessoa Física' })

}

export {
    ContactsRegister
}
import configDotenv from "../../utils/dotEnv";
import { Request, Response } from "express";
import User from "../../models/userSchema";
import multer from "multer";
import aws from 'aws-sdk';
import { PutObjectRequest } from "aws-sdk/clients/s3";

configDotenv();

const upload = multer();

const endpoint = new aws.Endpoint(`${process.env.BLACK_ENDPOINT}`);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: `${process.env.BLACK_KEY_ID}`,
        secretAccessKey: `${process.env.BLACK_APP_KEY}`,
    },
});



const UsersRegister = async (req: Request, res: Response) => {
    upload.single("imagem")(req, res, async (err) => {
        if (err) {
            console.error("Erro ao processar Upload", err);
            res.status(500).json({ mensagem: "Erro interno servidor ao processar upload" });
            return;

        }


        const { username, email, phone, password } = req.body;
        const { file } = req;

        try {

            if (!file) {
                return res.status(400).json({ mensagem: 'Nenhum arquivo foi enviado' });
            }

            const params: PutObjectRequest = {
                Bucket: `${process.env.BLACK_KEY_NAME}`,
                Key: `User/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const s3UploadResponse = await s3.upload(params).promise();

            const newUser = new User({
                username,
                email,
                phone,
                password,
                imagem: {
                    url: s3UploadResponse.Location,
                    contentType: file.mimetype,
                    key: params.Key,
                }

            })

            const savedUser = await newUser.save();

            res.status(201).json({
                mensagem: "Usuário Cadastrado com sucesso",
                savedUser
            });

        } catch (error) {
            console.error(error);
            res.status(500).send('Erro no servidor');

        }

    })

}

export {
    UsersRegister
}
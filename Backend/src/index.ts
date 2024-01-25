
import express, { Request, Response, NextFunction } from 'express';

import rotas from './routes';

import database from './database/connection';


const PORT = process.env.PORT || 8000;

const app = express();

import cors from 'cors';


const allowedOrigins = [

    "http://localhost:5173",


];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {

        await database();
        next();

    } catch (error) {


        res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
});



app.use(express.json());

app.use(rotas);




app.listen(PORT, () => {
    console.log(`Server  on port ${PORT}`);



});



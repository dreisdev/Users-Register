import express from 'express';
import { UsersRegister } from './controllers/UsersRegister/usersRegister';
import { LoginUser } from './controllers/LoginUser/login';
import { ContactsRegister } from './controllers/ContactsRegister/contactsRegister';

const rotas = express();

rotas.use(express.json());

rotas.post('/cadastroUsuario', UsersRegister);
rotas.get('/login', LoginUser);
rotas.get('/cadastroPF', ContactsRegister);


export default rotas;
import express from 'express';
import { UsersRegister } from './controllers/UsersRegister/usersRegister';
import { LoginUser } from './controllers/LoginUser/login';
import { PersonDelete, PersonRegister, DeleteAddress, DeleteContact, EditAddress, EditContact } from './controllers/ContactsRegister/contactsRegister';
import { authenticateToken } from './middleware/authenticateToken';
import { GetAllPerssons } from './controllers/PersonsUser/personsUser';


const rotas = express();

rotas.use(express.json());

rotas.post('/cadastroUsuario', UsersRegister);
rotas.post('/login', LoginUser);


rotas.use(authenticateToken)
rotas.get('/listaPF/:userId', GetAllPerssons);

rotas.post('/cadastroPF/:userId', PersonRegister);
rotas.delete('/excluirPF/:userId/:personId', PersonDelete);

rotas.put('/editarPF/:userId/:personId', EditAddress);
rotas.delete('/excluirEndereco/:userId/:personId', DeleteAddress);
rotas.put('/editarPFC/:userContactId/:personContactId', EditContact);
rotas.delete('/exluirContato/:userContactId/:personContactId', DeleteContact);


export default rotas;
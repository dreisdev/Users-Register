// routes/userRoutes.ts

import { Request, Response } from "express";
import User from "../../models/userSchema";
import mongoose from "mongoose";






const PersonRegister = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { person } = req.body;

        if (!userId) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado PersonRegister' });
        }

        const filter = { _id: new mongoose.Types.ObjectId(userId) };

        try {
            await User.findByIdAndUpdate(userId, {
                $push: { 'person': person },
            });


        } catch (error) {

            console.error(error);

            return res.status(500).json({ mensagem: `Erro MongoDB ${error}` });

        }

        const existingUser = await User.findOne(filter);

        if (!existingUser) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.status(201).json({
            mensagem: "Pessoa física cadastrada com sucesso",
            user: existingUser,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
}



const PersonDelete = async (req: Request, res: Response) => {
    try {
        const { userId, personId } = req.params;

        if (!userId) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado PersonDelete' });
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId),
            'person._id': new mongoose.Types.ObjectId(personId)
        });

        if (!user) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para excluir esta pessoa' });
        }

        const filter = { _id: new mongoose.Types.ObjectId(userId) };

        const update = {
            $pull: {
                'person': { _id: new mongoose.Types.ObjectId(personId) }
            }
        };

        try {

            const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            res.status(200).json({
                mensagem: "Pessoa física removida com sucesso",
                user: updatedUser,
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


const EditAddress = async (req: Request, res: Response) => {
    const { personAddress, index } = req.body;

    try {
        const { userId, personId } = req.params



        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(personId)) {


            return res.status(401).json({ mensagem: 'Usuário não autenticado EditAddress' });
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId),
            'person._id': new mongoose.Types.ObjectId(personId)
        });

        if (!user) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para editar esse Endereço' });
        }

        const addressIndex = index

        const update = {
            $set: {
                [`person.$[outer].addresses.${addressIndex}.place`]: personAddress.place,
                [`person.$[outer].addresses.${addressIndex}.numberHouse`]: personAddress.numberHouse,
                [`person.$[outer].addresses.${addressIndex}.zipCode`]: personAddress.zipCode,
                [`person.$[outer].addresses.${addressIndex}.complement`]: personAddress.complement,
                [`person.$[outer].addresses.${addressIndex}.city`]: personAddress.city,
                [`person.$[outer].addresses.${addressIndex}.state`]: personAddress.state,

            }
        };

        const options = {
            arrayFilters: [{ "outer._id": new mongoose.Types.ObjectId(personId) }],
            new: true,
        };

        try {

            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                update,
                options
            );

            if (!updatedUser) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            res.status(201).json({
                mensagem: "Endereço editado com sucesso",
                user: updatedUser,

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

const DeleteAddress = async (req: Request, res: Response) => {
    const { personAddressId } = req.body;

    try {
        const { userId, personId } = req.params



        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(personId)) {


            return res.status(401).json({ mensagem: 'Usuário não autenticado DeleteAddress' });
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId),
            'person._id': new mongoose.Types.ObjectId(personId)
        });

        if (!user) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para excluir esse endereço' });
        }



        const update = {
            $pull: {
                'person.$[outer].addresses': { _id: new mongoose.Types.ObjectId(personAddressId._id) }

            }
        };

        const options = {
            arrayFilters: [{ "outer._id": new mongoose.Types.ObjectId(personId) }],
            new: true,
        };

        try {

            const deletedUserAddress = await User.findOneAndUpdate(
                { _id: userId },
                update,
                options
            );

            if (!deletedUserAddress) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            res.status(201).json({
                mensagem: "Endereço excluído com sucesso",
                user: deletedUserAddress,

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

const EditContact = async (req: Request, res: Response) => {
    const { personContact, index } = req.body;

    try {
        const { userContactId, personContactId } = req.params



        if (!mongoose.Types.ObjectId.isValid(userContactId) || !mongoose.Types.ObjectId.isValid(personContactId)) {


            return res.status(401).json({ mensagem: 'Usuário não autenticado EditContact' });
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userContactId),
            'person._id': new mongoose.Types.ObjectId(personContactId)
        });

        if (!user) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para editar esse contato' });
        }

        const addressIndex = index

        const update = {
            $set: {
                [`person.$[outer].contacts.${addressIndex}.nameContact`]: personContact.nameContact,
                [`person.$[outer].contacts.${addressIndex}.personContact`]: personContact.personContact,
                [`person.$[outer].contacts.${addressIndex}.typeContact`]: personContact.typeContact,


            }
        };

        const options = {
            arrayFilters: [{ "outer._id": new mongoose.Types.ObjectId(personContactId) }],
            new: true,
        };

        try {

            const editedContactdUser = await User.findOneAndUpdate(
                { _id: userContactId },
                update,
                options
            );

            if (!editedContactdUser) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            res.status(201).json({
                mensagem: "Contato editado com sucesso",
                contactUser: editedContactdUser,

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

const DeleteContact = async (req: Request, res: Response) => {
    const { personContact } = req.body;

    try {
        const { userContactId, personContactId } = req.params



        if (!mongoose.Types.ObjectId.isValid(userContactId) || !mongoose.Types.ObjectId.isValid(personContactId)) {


            return res.status(401).json({ mensagem: 'Usuário não autenticado EditContact' });
        }

        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userContactId),
            'person._id': new mongoose.Types.ObjectId(personContactId)
        });

        if (!user) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para excluir esse contato' });
        }



        const update = {
            $pull: {
                'person.$[outer].contacts': { _id: new mongoose.Types.ObjectId(personContact._id) },



            }
        };

        const options = {
            arrayFilters: [{ "outer._id": new mongoose.Types.ObjectId(personContactId) }],
            new: true,
        };

        try {

            const deletedContactUser = await User.findOneAndUpdate(
                { _id: userContactId },
                update,
                options
            );

            if (!deletedContactUser) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            res.status(201).json({
                mensagem: "Contato excluído com sucesso",
                contactUser: deletedContactUser,

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

export { PersonRegister, PersonDelete, EditAddress, DeleteAddress, EditContact, DeleteContact };

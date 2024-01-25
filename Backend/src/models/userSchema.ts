import mongoose, { Schema } from "mongoose";
import { Error as CallbackError } from 'mongoose';

import bcrypt from 'bcrypt';

import { IAddress, IContact, IPersonalInfo, IUser } from "../@types/models";
import { Contato } from "../@types/typeContacts";



const addressSchema = new Schema<IAddress>({
    place: { type: String, required: true },
    numberHouse: { type: String, required: true },
    zipCode: { type: String, required: true },
    complement: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
});

const contactSchema = new Schema<IContact>({
    nameContact: { type: String, required: true },
    personContact: { type: String, required: true },
    typeContact: { type: String, enum: Object.values(Contato).map(String), required: true },
});

const personalInfoSchema = new Schema<IPersonalInfo>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birth: { type: Date, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    addresses: { type: [addressSchema], default: [] },
    contacts: { type: [contactSchema], default: [] },
});

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        imagem: {
            url: {
                type: String,
                required: true,
            },

            key: {
                type: String,
                required: true,
            },
        },
        person: { type: [personalInfoSchema], default: [] },

    },

    { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {

    if (!this.isModified('password')) {

        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: unknown) {

        return next(error as CallbackError);
    }

})

const User = mongoose.model<IUser>('User', userSchema, 'users')

export default User;
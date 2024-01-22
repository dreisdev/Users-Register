import mongoose, { Schema } from "mongoose";
import { Error as CallbackError } from 'mongoose';

import bcrypt from 'bcrypt';

import { IUser } from "../@types/models";

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

const User = mongoose.model<IUser>('User', userSchema)

export default User;
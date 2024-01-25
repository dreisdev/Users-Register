import mongoose, { Document } from "mongoose";
import { Contato } from "./typeContacts";

export interface IUser extends Document {
    username: string;
    email: string;
    phone: string;
    password: string;
    imagem?: string;
    person?: IPersonalInfo[];

}

export interface IPersonalInfo {
    name: string;
    lastName: string;
    birth: Date;
    email: string;
    cpf: string;
    rg: string;
    addresses: IAddress[];
    contacts: IContact[];
    _id?: string;
}

export interface IAddress {
    place: string;
    numberHouse: string;
    zipCode: string;
    complement: string;
    city: string;
    state: string;
    _id?: string;

}

export interface IContact {
    nameContact: string;
    personContact: string;
    typeContact: Contato;

}

export interface IPerson extends Document {
    user: mongoose.Types.ObjectId;
    personalInfo: IPersonalInfo[];
    addresses: IAddress[];
    contacts: IContact[];
}





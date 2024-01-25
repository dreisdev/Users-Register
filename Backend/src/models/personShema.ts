// import mongoose, { Schema } from "mongoose";
// import { IAddress, IContact, IPerson, IPersonalInfo } from "../@types/models";

// const personalInfoSchema = new Schema<IPersonalInfo>({
//     name: { type: String, required: true },
//     lastName: { type: String, required: true },
//     birth: { type: Date, required: true },
//     email: { type: String, required: true },
//     cpf: { type: String, required: true },
//     rg: { type: String, required: true },
// })


// const addressShema = new Schema<IAddress>({
//     place: { type: String, required: true },
//     numberHouse: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     complement: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
// });

// const contactShema = new Schema<IContact>({
//     nameContact: { type: String, required: true },
//     personContact: { type: String, required: true },
//     typeContact: { type: String, enum: ['Email', 'Telefone'], required: true },
// });

// const personShema = new Schema<IPerson>({
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     personalInfo: { type: [personalInfoSchema], default: [] },
//     addresses: { type: [addressShema], default: [] },
//     contacts: { type: [contactShema], default: [] },
// });

// const Person = mongoose.model<IPerson>('Person', personShema);

// export default Person;


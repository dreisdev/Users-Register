export interface Contact {
    nameContact: string;
    personContact: string;
    typeContact: string;
    _id?: string;
}

export interface Address {
    place: string;
    numberHouse: string;
    zipCode: string;
    complement: string;
    city: string;
    state: string;
    _id?: string;
}

export interface Person extends PersonInput {
    // name: string;
    // lastName: string;
    // birth: string;
    // email: string;
    // cpf: string;
    // rg: string;
    // people: PersonInput[];
    addresses: Address[];
    contacts: Contact[];
    // _id?: string;
}

export interface PersonInput {
    name: string;
    lastName: string;
    birth: Date | null;
    email: string;
    cpf: string;
    rg: string;
    _id?: string;
} 
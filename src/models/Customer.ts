export default class Customer {
    id: number;
    code: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;
    birthday: Date;
    totalExpense: number;
    numberOfOrder: number;

    constructor(id: number, code: string, name: string, email: string, phoneNumber: string, address: string, gender: boolean, birthday: Date, totalExpense: number, numberOfOrder: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.gender = gender;
        this.birthday = birthday;
        this.totalExpense = totalExpense;
        this.numberOfOrder = numberOfOrder;
    }
}
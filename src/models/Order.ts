export default class Order {
    code: string;
    customerId: number;
    orderDetails: [];
    note: string;
    paymentType: string;
    totalQuantity: number;
    cashReceived: number;
    cashRepay: number;
    totalPayment: number;
    createdOn: Date;
    constructor(code: string, customerId: number, orderDetails: [], note: string, paymentType: string, totalQuantity: number, totalPayment: number, cashReceived: number, cashRepay: number, createdOn: Date) {
        this.code = code;
        this.customerId = customerId;
        this.orderDetails = orderDetails;
        this.note = note;
        this.paymentType = paymentType;
        this.totalQuantity = totalQuantity;
        this.totalPayment = totalPayment;
        this.cashReceived = cashReceived;
        this.cashRepay = cashRepay;
        this.createdOn = createdOn;
    }

    static fromJson(json: any): Order {
        return new Order(json.code, json.customerId, json.orderDetails, json.note, json.paymentType, json.totalQuantity, json.totalPayment, json.cashReceived, json.cashRepay, new Date(json.createdOn));
    }
}
class Order {
    code: string;
    customerId: number;
    orderDetails: [];
    note: string;
    paymentType: string;
    totalQuantity: number;
    cashReceived: number;
    cashRepay: number;
    totalPayment: number;
    constructor(code: string, customerId: number, orderDetails: [], note: string, paymentType: string, totalQuantity: number, totalPayment: number, cashReceived: number, cashRepay: number) {
        this.code = code;
        this.customerId = customerId;
        this.orderDetails = orderDetails;
        this.note = note;
        this.paymentType = paymentType;
        this.totalQuantity = totalQuantity;
        this.totalPayment = totalPayment;
        this.cashReceived = cashReceived;
        this.cashRepay = cashRepay;
    }
}
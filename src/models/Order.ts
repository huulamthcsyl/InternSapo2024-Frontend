class Order {
    code: string;
    customerName: string;
    createdOn: Date;
    totalQuantity: number;
    totalPayment: number;
    constructor(code: string, customerName: string, createdOn: Date, totalQuantity: number, totalPayment: number) {
        this.code = code;
        this.customerName = customerName;
        this.createdOn = createdOn;
        this.totalQuantity = totalQuantity;
        this.totalPayment = totalPayment;
    }
}
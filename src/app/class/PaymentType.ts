import { PaymentDate } from "./PaymentDate";

export class PaymentType {
    id: Number;
    name: String = '';
    description: String;
    quantity: Number;
    amount: Number;
    created_at: String;
    updated_at: String;

    paymentDate: Array<PaymentDate> = [];

    constructor() {}

    upperName() {
        this.name = this.name.toUpperCase();
    }  
    
    setData(data) {
        this.id = parseFloat(data.id);
        this.name = data.name;
        this.description = data.description;
        this.quantity = data.quantity;
        this.amount = parseFloat(data.amount);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

}
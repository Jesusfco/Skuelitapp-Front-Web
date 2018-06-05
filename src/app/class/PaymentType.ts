export class PaymentType {
    id: Number;
    name: String = '';
    description: String;
    quantity: Number;
    amount: Number;
    created_at: String;
    updated_at: String;

    constructor() {}

    upperName() {
        this.name = this.name.toUpperCase();
    }  

}
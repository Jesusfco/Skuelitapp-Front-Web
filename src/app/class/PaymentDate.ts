export class PaymentDate {
    
    id: Number;
    date: String;
    payment_type_id: Number;
    period_id: Number;
    created_at: String;
    updated_at: String;
    
    constructor() {}

    setFromData(data) {
        this.id = parseFloat(data.id);
        this.date = data.date;
        this.payment_type_id = parseFloat(data.payment_type_id);
        this.period_id = parseFloat(data.period_id);
        this.created_at = data.created_at;
        this.updated_at = data.created_at;
    }
    
}
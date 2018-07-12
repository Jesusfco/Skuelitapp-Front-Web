export class Receipt {

    id: Number;
    user_id: Number;
    user_name: String;
    creator_id: Number;
    creator_name: String;
    amount: Number;
    payment_date_id: Number;
    period_id: Number;
    receipt_type: Number;
    created_at: Number;
    updated_at: String;

    constructor() {}

    setData(data) {

        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        this.user_name = data.user_name;
        this.creator_id = parseInt(data.creator_id);
        this.amount = parseFloat(data.creator_id);
        this.payment_date_id = parseFloat(data.payment_date_id);
        this.period_id = parseInt(data.period_id);
        this.receipt_type = parseInt(data.receipt_type);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

    }


}
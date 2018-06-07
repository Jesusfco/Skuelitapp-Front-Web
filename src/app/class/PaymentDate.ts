export class PaymentDate {
    
    public id: Number;
    public date: String;
    public payment_type_id: Number;
    public period_id: Number;
    public created_at: String;
    public updated_at: String;
    public validations: any = {
        date: 0,
        validate: true
    };
    public edit: Boolean = false;

    constructor() {}

    setIdRamdom(){
        this.id = Math.floor((Math.random() * Math.floor(10000))) * -1;
    }
    setFromData(data) {
        this.id = parseFloat(data.id);
        this.date = data.date;
        this.payment_type_id = parseFloat(data.payment_type_id);
        this.period_id = parseFloat(data.period_id);
        this.created_at = data.created_at;
        this.updated_at = data.created_at;
    }

    restoreValidations() {
        this.validations = {
            date: 0,
            validate: true
        };
    }

    validateDate(period) {
        if(this.date == null || this.date == '') {
            this.validations.date = 1;
            this.validations.validate = false;
        } else if( this.date < period.from || this.date > period.to) {
            this.validations.date = 2;
            this.validations.validate = false;
        }
    }

}
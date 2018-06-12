import { PaymentDate } from "./PaymentDate";

export class PaymentType {
    public id: Number;
    public  name: String = '';
    public description: String;
    public quantity: Number;
    public amount: Number;
    public period_type_id: Number = 1;
    public period_type_view: String;
    public created_at: String;
    public updated_at: String;

    public paymentDate: Array<PaymentDate> = [];

    public validations: any = {
        validate: true,
        name: 0,
        quantity: 0,
        amount: 0
    };

    constructor() {}

    upperName() {
        this.name = this.name.toUpperCase();
    }

    setData(data) {
        this.id = parseFloat(data.id);
        this.name = data.name;
        this.description = data.description;
        this.quantity = data.quantity;
        this.period_type_id = parseFloat(data.period_type_id);
        this.amount = parseFloat(data.amount);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        this.setPeriodTypeView();
    }

    restoreValidation() {
        this.validations = {
            validate: true,
            name: 0,
            quantity: 0,
            amount: 0
        };
    }

    validateName() {
        if(this.name.length < 2) {
            this.validations.name = 1;
            this.validations.validate = false;
        }
    }

    validateQuantity() {
        if(this.quantity <= 0 || this.quantity == null) {
            this.validations.quantity = 1;
            this.validations.validate = false;
        }
    }

    validateAmount() {
        if(this.amount <= 0 || this.amount == null) {
            this.validations.amount = 1;
            this.validations.validate = false;
        }
    }

    validateALL() {

        this.restoreValidation();
        this.validateName();
        this.validateQuantity();
        this.validateAmount();

        return this.validations.validate;

    }

    setPeriodTypeView() {

        if(this.period_type_id == 1) {
            this.period_type_view = "ANUAL";
        } else if (this.period_type_id == 2) {
            this.period_type_view = "SEMESTRAL";
        } else if (this.period_type_id == 3) {
            this.period_type_view = "CUATRIMESTRAL";
        }
        

    }

}
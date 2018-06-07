import { PaymentDate } from "./PaymentDate";

export class PaymentType {
    public id: Number;
    public  name: String = '';
    public description: String;
    public quantity: Number;
    public amount: Number;
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
        this.amount = parseFloat(data.amount);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
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

}
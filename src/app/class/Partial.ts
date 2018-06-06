export class Partial {

    public id: Number;
    public period_id: Number;
    public partial: Number;
    public from: String;
    public to: String;
    public created_at: String;
    public updated_at: String;
    public edit: Boolean = false;
    public validations: any = {
        from: 0,
        to: 0,
        validate: true,
    };


    constructor() {}

    setData(data){
        this.id = parseFloat(data.id);
        this.period_id = parseFloat(data.period_id);
        this.partial = parseFloat(data.partial);
        this.from = data.from;
        this.to = data.to;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    resetValidation() {
        this.validations = {
            from: 0,
            to: 0,
            validate: true,
        };
    }

    validateFrom() {
        if(this.from == null || this.from == undefined) {
            this.validations.from = 1;
            this.validations.validate = false;
        }
    }

    validateTo() {
        if(this.to == null || this.to == undefined) {
            this.validations.to = 1;
            this.validations.validate = false;
        }
    }

    validateFromTo() {
        if(this.to <= this.from) {
            this.validations.to = 2;
            this.validations.from = 2;
            this.validations.validate = false;
        }
    }

    validateAll() {
        this.resetValidation();
        this.validateFrom();
        this.validateTo();
        if(this.validations.validate) {
            this.validateFromTo();
        }

        return this.validations.validate;
    }

}
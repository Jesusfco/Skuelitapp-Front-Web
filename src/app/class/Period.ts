import { Partial } from './partial';

export class Period {

    public id: Number;
    public partials: Number = 1;
    public from: String;
    public to: String;
    public created_at: String;
    public updated_at: String;
    public partialsArray: Array<Partial> = [];

    public validations = {
        partials: 0,
        from: 0,
        to: 0,
        validate: true
    };

    constructor() {}

    setArrayPartials() {

        this.partialsArray = [];

        for(let i = 0; i < this.partials; i++) {
            
            let par = new Partial();
            par.partial = i + 1;
            this.partialsArray.push(par);

        }

    }

    resetAllPartialValidation() {
        for(let i = 0; i < this.partialsArray.length; i ++) {
            this.partialsArray[i].resetValidation();
        }
    }

    resetValidation(){
        this.validations = {
            partials: 0,
            from: 0,
            to: 0,
            validate: true
        };
    }

    validatePartial() {
        if(this.partials <= 0 || this.partials == null){
            this.validations.partials = 1;
            this.validations.validate = false;
        }
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

    validateAll(){
        this.resetValidation();
        this.validatePartial();
        this.validateFrom();
        this.validateTo();
        if(this.validations.validate) {
            this.validateFromTo();
        }

        return this.validations.validate;
    }

    validatePartialArray() {

        let x = true;

        for(let i = 0; i < this.partialsArray.length; i++) {
            if(!this.partialsArray[i].validateAll()) {
                x = false;
            }
        }

        return x;

    }
}

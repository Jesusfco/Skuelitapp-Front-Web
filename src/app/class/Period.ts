import { Partial } from './partial';

export class Period {

    public id: Number;
    public partials: Number = 1;
    public from: String;
    public to: String;
    public period_type_id: Number = 1;
    public period_type_view: String;
    public school_level_id: Number;
    public school_level_view: String;
    public status: Number;
    public inscription: Number = 0;
    public created_at: String;
    public updated_at: String;
    public partialsArray: Array<Partial> = [];

    public validations = {
        partials: 0,
        from: 0,
        to: 0,
        schoolLevel: 0,
        validate: true
    };

    constructor() {}

    setDataEdit(data){
        this.id = parseFloat(data.id);
        this.partials = parseFloat(data.partials);
        this.from = data.from;
        this.to = data.to;
        this.period_type_id = parseFloat(data.period_type_id);
        this.school_level_id = parseFloat(data.school_level_id);
        this.status = parseFloat(data.status);
        this.inscription = parseFloat(data.inscription);
        this.created_at = data.created_at;
        this.updated_at = data.updated_ad;

        this.partialsArray = [];

        if(data.partialsArray != undefined)
        
            for(let p of data.partialsArray) {

                let x: Partial = new Partial();
                x.setData(p);
                this.partialsArray.push(x);

            }
        
        this.setSchoolLevelView();
        this.setPeriodTypeView(this.getFakeTypes());

    }

    setSchoolLevelView() {
        if(this.school_level_id == 1) {
            this.school_level_view = 'KINDER';
        } else if (this.school_level_id == 2) {
            this.school_level_view = 'PRIMARIA';
        }  else if (this.school_level_id == 3) {
            this.school_level_view = 'SECUNDARIA';
        }  else if (this.school_level_id == 4) {
            this.school_level_view = 'PREPARATORIA';
        }
    }

    setArrayPartials() {

        this.partialsArray = [];

        for(let i = 0; i < this.partials; i++) {
            
            let par = new Partial();
            par.partial = i + 1;
            this.partialsArray.push(par);

        }

    }

    getFakeTypes() {
        return [
            {id: 1, name: 'ANUAL'},
            {id: 2, name: 'SEMESTRAL'},
            {id: 3, name: 'CUATRIMESTRAL'},
        ];

    }

    setPeriodTypeView(types){

        for(let type of types) {

            if(type.id == this.period_type_id){

                this.period_type_view = type.name;
                break;

            }

        }

    }

    getStatusArrayOptions() {
        return [
            {
                id: 1,
                title: 'INSCRIPCIONES',
            },
            {
                id: 2,
                title: 'ACTIVO',
            },
            {
                id: 3,
                title: 'FINALIZADO',
            },
        ];
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
            schoolLevel: 0,
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

    validateSchoolLevel() {
        if(this.school_level_id == null) {
            this.validations.schoolLevel = 1;
            this.validations.validate = false;
        }
    }

    validateAll(){
        this.resetValidation();
        this.validatePartial();
        this.validateFrom();
        this.validateTo();
        this.validateSchoolLevel();
        if(this.validations.to == 0 && this.validations.from == 0) {
            this.validateFromTo();
        }
        console.log(this);
        return this.validations.validate;
    }

    validatePartialArray() {

        let x = true;

        for(let i = 0; i < this.partialsArray.length; i++) {
            if(!this.partialsArray[i].validateAll()) {
                x = false;
            } 
            
            
                if(this.partialsArray[i].from < this.from) {
                    this.partialsArray[i].validations.from = 3;
                    this.partialsArray[i].validations.validate = false;
                    x = false;
                }

                if(this.partialsArray[i].to > this.to) {
                    this.partialsArray[i].validations.to = 3;
                    this.partialsArray[i].validations.validate = false;
                    x = false;
                }
            
        }

        return x;

    }
}

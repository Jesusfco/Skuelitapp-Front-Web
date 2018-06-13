export class User {
    id: Number;
    name: String = '';
    patern_surname: String = '';
    matern_surname: String = '';
    phone: String = '';
    email: String = '';
    CURP: String = '';
    password: String = '';
    group_id: Number;
    grade: Number;
    school_level_id: Number;
    money: Number;
    subjects_id: Array<Number> = [];
    students_id: Array<Number> = [];
    user_type: Number = 1;
    address_id: Number;
    cash_register_id: Number;
    payment_type_id: Number;
    status: Number;
    gender: Number = 1;
    birthday: String;
    created_at: String;
    updated_at: String;

    validations: any = {
        validate: true,
        name: 0,
        patern_surname: 0,
        matern_surname: 0,
        email: 0,
        password: 0,
        birthday: 0,
        CURP: 0,
        phone: 0,
        grade: 0,
    };

    constructor() {}

    setData(data) {
        this.id = parseFloat(data.id);
        this.name = data.name;
        this.patern_surname = data.patern_surname;
        this.matern_surname = data.matern_surname;
        this.email = data.email;
        this.CURP = data.CURP;
        this.group_id = parseFloat(data.group_id);
        this.money = parseFloat(data.money);
        this.students_id = this.setArrayNumberFromData(data.students_id);
        this.subjects_id = this.setArrayNumberFromData(data.id_subjects);
        this.user_type = parseFloat(data.user_type);
        this.address_id = parseFloat(data.address_id);
        this.payment_type_id = parseFloat(data.payment_type_id);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    upperCaseName() {
        this.name = this.name.toUpperCase();
    }

    upperCasePatern() {
        this.patern_surname = this.patern_surname.toUpperCase();
    }

    upperCaseMatern() {
        this.matern_surname = this.matern_surname.toUpperCase();
    }

    lowerCaseEmail(){
        this.email = this.email.toLocaleLowerCase();
    }

    upperCaseCURP() {
        this.CURP = this.CURP.toUpperCase();
    }

    setArrayNumberFromData(ids){
        let array = [];

        return array;

    }

    setValidations() {
        this.validations = {
            validate: true,
            name: 0,
            patern_surname: 0,
            matern_surname: 0,
            email: 0,
            password: 0,
            birthday: 0,
            CURP: 0,
            phone: 0,
            grade: 0,
        };
    }

    validatePhoneFormat(){
        this.phone = this.phone.replace(/\D/g, '');
    }

    validateName() {
        
        this.name = this.name.replace(/\s+$/, '');

        if(this.name == '') {
            this.validations.name = 1;
            this.validations.validate = false;
        }

    }

    validatePaternSurname() {
        this.patern_surname = this.patern_surname.replace(/\s+$/, '');

        if(this.patern_surname == '') {
            this.validations.patern_surname = 1;
            this.validations.validate = false;
        }
    }

    validateMaternSurname() {
        this.matern_surname = this.matern_surname.replace(/\s+$/, '');

        if(this.matern_surname == '') {
            this.validations.matern_surname = 1;
            this.validations.validate = false;
        }

    }

    validateEmail() {
        this.email = this.email.replace(/\s+$/, '');

        if(this.email == '') {
            this.validations.email = 1;
            this.validations.validate = false;
        }
    }

    validateBirthday() {
        if(this.birthday == '') {
            this.validations.birthday = 1;
            this.validations.validate = false;
        }
    }

    validateCurp() {
        if(this.CURP == '') {
            this.validations.CURP = 1;
            this.validations.validate = false;
        }
    }

    validatePhone() {
        if(this.phone.length < 7) {
            this.validations.phone = 1;
            this.validations.validate = false;
        }
    }

    validateGrade() {
        if (this.grade == null) {
            this.validations.grade = 1;
            this.validations.validate = false;
        }
    }

    validationLogic() {

        this.setValidations();

        if(this.user_type == 1) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validateBirthday();
            this.validateGrade();
            // this.validateCurp();
        } else if (this.user_type == 2) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
        } else if(this.user_type == 3) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
        } else if(this.user_type == 4) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
        } else if(this.user_type == 5) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
        }

        return this.validations.validate;
    }

}
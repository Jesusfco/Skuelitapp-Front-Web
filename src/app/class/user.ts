import { Address } from "./Address";

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
    subjects_id: String = '';
    students_id: String = '';
    user_type: Number = 1;
    user_type_view: String;
    address_id: Number;
    cash_register_id: Number;
    payment_type_id: Number;
    status: Number;
    gender: Number = 1;
    gender_view: String;
    birthday: String;
    created_at: String;
    updated_at: String;

    address: Address = new Address();

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
        this.grade = parseFloat(data.grade);
        this.school_level_id = parseFloat(data.school_level_id);
        this.money = parseFloat(data.money);
        this.students_id = data.students_id;
        this.subjects_id = data.id_subjects;
        this.user_type = parseFloat(data.user_type);
        this.address_id = parseFloat(data.address_id);
        this.payment_type_id = parseFloat(data.payment_type_id);
        this.cash_register_id = parseFloat(data.cash_register_id);
        this.birthday = data.birthday;
        this.gender = parseFloat(data.gender);
        this.status = parseFloat(data.status);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        if(data.address != undefined) {
            this.address = new Address();
            this.address.setData(data.address);
        }

        this.setGenderView();
        this.setUserTypeView();
    }

    setGenderView() {
        if(this.gender == 1) this.gender_view = 'M';
        if(this.gender == 2) this.gender_view = 'F';
    }

    setUserTypeView() {
        if(this.user_type == 1) { this.user_type_view = 'Alumno'; }
        else if(this.user_type == 2) { this.user_type_view = 'Tutor'; }
        else if(this.user_type == 3) { this.user_type_view = 'Maestro'; }
        else if(this.user_type == 4) { this.user_type_view = 'Cajero'; }
        else if(this.user_type == 5) { this.user_type_view = 'Administrador'; }
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

    validatePassword() {
        if(this.password.length < 5) {
            this.validations.password = 1;
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

            if(this.email.length > 1) {
                this.validatePassword();
            }
            // this.validateCurp();
        } else if (this.user_type == 2) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            if(this.email.length > 1) {
                this.validatePassword();
            }
        } else if(this.user_type == 3) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
            this.validatePassword();
        } else if(this.user_type == 4) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
            this.validatePassword();
        } else if(this.user_type == 5) {
            this.validateName();
            this.validatePaternSurname();
            this.validateMaternSurname();
            this.validatePhone();
            this.validateEmail();
            this.validatePassword();
        }

        return this.validations.validate;
    }

}
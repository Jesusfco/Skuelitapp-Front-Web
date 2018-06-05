export class User {
    id: Number;
    name: String = '';
    patern_surname: String = '';
    matern_surname: String = '';
    email: String = '';
    CURP: String = '';
    password: String = '';
    group_id: Number;
    money: Number;
    subjects_id: Array<Number> = [];
    students_id: Array<Number> = [];
    user_type: Number;
    address_id: Number;
    cash_register_id: Number;
    created_at: String;
    updated_at: String;

    constructor(){ }

    setData(data){
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
}
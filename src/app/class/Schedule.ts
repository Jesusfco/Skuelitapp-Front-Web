export class Schedule {

    id: Number;
    group_id: Number;
    subject_id: Number;
    subject: String;
    check_in: String;
    check_out: String;
    day: Number;
    teacher_id: Number;
    teacher: String;
    created_at: String;
    updated_at: String;

    validations = {
        validate: true,
        check_in: 0,
        check_out: 0,
        teacher_id: 0,
        subject_id: 0,
        day: 0
    };
    constructor() { }

    setData(data) {
        this.id = parseFloat(data.id);
        this.group_id = parseFloat(data.group_id);
        this.subject_id = parseFloat(data.subject_id);
        this.check_in = data.check_in;
        this.check_out = data.check_out;
        this.day = parseFloat(data.day);
        this.teacher_id = parseFloat(data.teacher_id);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        let str = this.check_in.split(':');
        this.check_in = str[0] + ':' + str[1];

        str = this.check_out.split(':');
        this.check_out = str[0] + ':' + str[1];

        if(data.teacher != undefined){
            this.teacher = data.teacher;
        }

        if(data.subject != undefined) {
            this.subject = data.subject;
        }
    }

    setValidations() {
        this.validations = {
            validate: true,
            check_in: 0,
            check_out: 0,
            teacher_id: 0,
            subject_id: 0,
            day: 0
        };
    }

    validateCheckIn() {
        if (this.check_in == null) {
            this.validations.check_in = 1;
            this.validations.validate = false;
        }
    }

    validateCheckOut() {
        if (this.check_out == null) {
            this.validations.check_out = 1;
            this.validations.validate = false;
        }
    }

    validateCheckInOut() {
        if (this.check_in  >= this.check_out) {
            this.validations.check_out = 2;
            this.validations.check_in = 2;
            this.validations.validate = false;
        }
    }

    validateDay() {
        if (this.day == null) {
            this.validations.day = 1;
            this.validations.validate = false;
        }
    }

    validateSubjectId() {
        if (this.subject_id == null) {
            this.validations.subject_id = 1;
            this.validations.validate = false;
        }
    }

    validateTeacherId() {
        if(this.teacher_id == null) {
            this.validations.teacher_id = 1;
            this.validations.validate = false;
        }
    }

    logicValidation() {
        this.setValidations();
        this.validateCheckIn();
        this.validateCheckOut();
        
        this.validateDay();
        this.validateSubjectId();
        this.validateTeacherId();
        if(this.validations.check_in == 0 && this.validations.check_out == 0) {
            this.validateCheckInOut();
        }

        return this.validations.validate;
    }

}
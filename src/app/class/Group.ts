export class Group {

    id: Number;
    students_id: Array<Number> = [];
    subjects_id: Array<Number> = [];
    grade: Number;
    group: number = 1;
    group_view: String;
    level_view: String;
    school_level_id: Number;    
    period_id: Number;
    updated_at: String;
    created_at: String;

    validations: any = {
        grade: 0,
        validate: true
    };

    constructor() {}

    setData(data) {
        this.id = parseFloat(data.id);
        this.grade = parseFloat(data.grade);
        this.group = parseFloat(data.group);
        this.school_level_id = parseFloat(data.school_level_id);
        this.period_id = parseFloat(data.period_id);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    setGroupView() {
        if(this.group == 1) { this.group_view = 'A'; }
        else if(this.group == 2) { this.group_view = 'B'; }
        else if(this.group == 3) { this.group_view = 'C'; }
        else if(this.group == 4) { this.group_view = 'D'; }
        else if(this.group == 5) { this.group_view = 'E'; }
        else if(this.group == 6) { this.group_view = 'F'; }
        else if(this.group == 7) { this.group_view = 'G'; }
        else if(this.group == 8) { this.group_view = 'H'; }
        else if(this.group == 9) { this.group_view = 'I'; }
        else if(this.group == 10) { this.group_view = 'J'; }
        else if(this.group == 11) { this.group_view = 'K'; }
        else if(this.group == 12) { this.group_view = 'L'; }
        else if(this.group == 13) { this.group_view = 'M'; }
        else if(this.group == 14) { this.group_view = 'N'; }
        else if(this.group == 15) { this.group_view = 'O'; }
        else if(this.group == 16) { this.group_view = 'P'; }
        else if(this.group == 17) { this.group_view = 'Q'; }
        else if(this.group == 18) { this.group_view = 'R'; }
        else if(this.group == 19) { this.group_view = 'S'; }
        else if(this.group == 20) { this.group_view = 'T'; }
        else if(this.group == 21) { this.group_view = 'U'; }
        else if(this.group == 22) { this.group_view = 'V'; }
        else if(this.group == 23) { this.group_view = 'X'; }
        else if(this.group == 24) { this.group_view = 'Y'; }
        else if(this.group == 25) { this.group_view = 'Z'; }

    }

    setLevelView() {
        if(this.school_level_id == 1) {
            this.level_view = 'KINDER';
        }else if(this.school_level_id == 2) {
            this.level_view = 'PRIMARIA';
        }
        else if(this.school_level_id == 3) {
            this.level_view = 'SECUNDARIA';
        }
        else if(this.school_level_id == 4) {
            this.level_view = 'PREPARATORIA';
        }
    }

    gradeManipulator() {
        if(this.grade < 1 ){
            this.grade = 1;
        } else if(this.school_level_id == 2 && this.grade > 6) {
            this.grade = 6;
        } else if(this.grade > 3 && this.school_level_id != 2) {
            this.grade = 3;
        }
    }

    levelManipulator() {
        if(this.school_level_id !== 2) {
            if(this.grade > 3) {
                this.grade = 3;
            }
        }
    }

    validateGrade() {
        if(this.grade == null) {
            this.validations.grade = 1;
            this.validations.validate = false;
        }
    }

    restoreValidation() {
        this.validations = {
            grade: 0,
            validate: true
        };
    }

}
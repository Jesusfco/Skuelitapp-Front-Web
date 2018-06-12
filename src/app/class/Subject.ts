import { SubjectService } from "../subject/subject.service";

export class Subject {

    id: Number;
    name: String = '';
    school_level_id: Number;
    level_view: String;
    grade: Number;
    created_at: String;
    updated_at: String;

    validations: any = {
        name: 0,
        school_level_id: 0,
        grade: 0,
        validate: true,
    };

    private _http: SubjectService;

    constructor() {}

    upperName() {
        this.name = this.name.toUpperCase();
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

    setData(data) {

        this.id = parseFloat(data.id);
        this.name = data.name;
        this.school_level_id = parseFloat(data.school_level_id);
        this.grade = parseFloat(data.grade);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        this.setLevelView();

    }

    restoreValidations() {
        
        this.validations = {
            name: 0,
            school_level_id: 0,
            grade: 0,
            validate: true,
        };

    }

    validateName(){

        this.name = this.name.replace(/\s+$/, '');
        
        if(this.name == "") {
            this.validations.name = 1;
            this.validations.validate = false;
        }

    }

    gradeFormat() {

        if(this.school_level_id == 1 || this.school_level_id == 3) {
            
            if(this.grade > 3) {
                this.grade = 3;
            }

        } else {
            
            if(this.grade > 6) {
                this.grade = 6;
            }

        }

        if(this.grade < 1) {
            this.grade = 1;
        }

    }

}
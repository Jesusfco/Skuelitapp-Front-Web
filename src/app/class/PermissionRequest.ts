import { PermissionRequestPhoto } from "./PermissionRequestPhoto";

export class PermissionRequest {

    public id: Number;
    public user_id: Number;
    public user_name: String;
    public subject: String = '';
    public description: String = '';
    public from: String;
    public to: String;
    public confirmed: Boolean;
    public created_at: String;
    public updated_at: String;
    public photos: Array<PermissionRequestPhoto> = [];

    public validations = {
        validate: true,
        subject: 0,
        description: 0,
        from: 0,
        to: 0,
        userId: 0
    };

    constructor() {}

    upperSubject() {
        this.subject = this.subject.toUpperCase();
    }

    setData(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        this.subject = data.subject;
        this.description = data.description;
        this.from = data.from;
        this.to = data.to;
        this.confirmed = data.confirmed;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        if(data.user_name != undefined) {
            this.user_name = data.user_name;
        }

        if(data.photos != undefined) {

            this.photos = [];

            for(let p of data.photos){

                let x: PermissionRequestPhoto = new PermissionRequestPhoto();
                x.setData(p);
                this.photos.push(x);

            }

        }

    }

    restoreValidations() {
        this.validations = {
            validate: true,
            subject: 0,
            description: 0,
            from: 0,
            to: 0,
            userId: 0,
        };
    }

    validateSubject() {
        this.subject.replace(/\s+$/, '');

        if(this.subject.length == 0) {
            this.validations.subject = 1;
            this.validations.validate = false;
        }
    }

    validateDescription() {
        this.description.replace(/\s+$/, '');

        if(this.description.length == 0) {
            this.validations.description = 1;
            this.validations.validate = false;
        }
    }

    validateFrom() {
        if(this.from == null || this.from == '') {  
            this.validations.from = 1;
            this.validations.validate = false;
        }
    }

    validateTo() {
        if(this.to == null || this.to == '') {
            this.validations.to = 1;
            this.validations.validate = false;
        }
    }

    validateFromTo() {

        if(this.validations.from == 0 && this.validations.to == 0) {

            if(this.from > this.to) {

                this.validations.to = 2;
                this.validations.from = 2;
                this.validations.validate = false;

            }

        }

    }

    validateUserId() {
        if(this.user_id == null) {
            this.validations.userId = 1;
            this.validations.validate = false;
        }
    }

    validateAll() {
        this.restoreValidations();
        this.validateUserId();
        this.validateSubject();
        this.validateDescription();
        this.validateFrom();
        this.validateTo();
        this.validateFromTo();
        return this.validations.validate;
    }

}
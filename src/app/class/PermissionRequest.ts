import { PermissionRequestPhoto } from "./PermissionRequestPhoto";

export class PermissionRequest {

    public id: Number;
    public creator_id: Number;
    public subject: String = '';
    public description: String = '';
    public from: String;
    public to: String;
    public validate: Boolean;
    public created_at: String;
    public updated_at: String;
    public photos: Array<PermissionRequestPhoto> = [];

    public validations = {
        validate: true,
        subject: 0,
        description: 0,
        from: 0,
        to: 0,
    };

    constructor() {}

    setData(data) {
        this.id = parseInt(data.id);
        this.creator_id = parseInt(data.creator_id);
        this.subject = data.subject;
        this.description = data.description;
        this.from = data.from;
        this.to = data.to;
        this.validate = data.validate;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

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
        if(this.from == null) {
            this.validations.from = 1;
            this.validations.validate = false;
        }
    }

    validateTo() {
        if(this.to == null) {
            this.validations.to = 1;
            this.validations.validate = false;
        }
    }

    validateFromTo() {

        if(this.validations.from == 0 && this.validations.to == 0) {

            if(this.from > this.to) {

                this.validations.to = 1;
                this.validations.from = 1;
                this.validations.validate = false;

            }

        }

    }

}
export class Subject {

    id: Number;
    name: String = '';
    created_at: String;
    updated_at: String;

    constructor() {}

    upperName() {
        this.name = this.name.toUpperCase();
    }
    
}
export class SchoolLevelModality {

    public id: Number;
    public school_level_id: Number;
    public period_type_id: Number;
    public created_at: String;
    public updated_at: String;

    constructor() {}

    setData(data) {
        this.id = parseFloat(data.id);
        this.school_level_id = parseFloat(data.school_level_id);
        this.period_type_id = parseFloat(data.period_type_id);
    }

}
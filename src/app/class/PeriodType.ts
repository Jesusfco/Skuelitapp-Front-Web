export class PeriodType {

    public id: Number;
    public name: String;
    public months: Number;
    public active: Boolean;

    constructor() {}

    setData(data) {
        
        this.id = parseFloat(data.id);
        this.name = data.name;
        this.months = parseFloat(data.months);
        this.active = data.active;
        
    }

}
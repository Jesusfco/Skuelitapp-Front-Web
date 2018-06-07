export class SchoolLevel {

    public id: Number;
    public name: String = '';
    public active: Boolean = false;


    constructor() {}

    getBasicLevel() {
        
        let level = [
            {
                id: 1,
                name: 'KINDER'
            }, {
                id: 2,
                name: 'PRIMARIA'
            }, {
                id: 3,
                name: 'SECUNDARIA'
            }, {
                id: 4,
                name: 'PREPARATORIA'
            }
        ];

        return level;
    }

    setData(data) {
        this.id = parseFloat(data.id);
        this.name = data.name;
        this.active = data.active;
    }
}
import { Partial } from './partial';

export class Period {

    public id: Number;
    public partials: Number;
    public from: String;
    public to: String;
    public created_at: String;
    public updated_at: String;
    public partialsArray: Array<Partial> = [];

    constructor() {}

    setArrayPartials() {
        
        for(let i = 0; i < this.partials; i++) {

            this.partialsArray = [];
            let par = new Partial();
            this.partialsArray.push(par);
            
        }

    }
}

export class Message {

    public id: Number;
    public message: String = '';
    public from: Number;
    public fromName: String;
    public to: Number;
    public toName: String;
    public created_at: String;

    constructor() {}

    setData(data) {
        this.id = parseInt(data.id);
        this.message = data.message;
        this.from = parseInt(data.from);
        this.to = parseInt(data.to);
        this.created_at = data.created_at;
    }

}
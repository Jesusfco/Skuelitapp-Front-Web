export class Message {

    public id: number;
    public conversation_id: Number;
    public message: String = '';
    public from_id: Number = 0;
    public from: String;
    public created_at: String;
    public checked: Boolean;

    constructor() {}

    setData(data) {
        this.id = parseInt(data.id);
        this.conversation_id = parseInt(data.conversation_id);
        this.message = data.message;
        this.from_id = parseInt(data.from_id);
        this.created_at = data.created_at;
        this.checked = data.checked;
    }

    preview(){

        if(this.message.length > 30) {

            let string = this.message.substring(0, 28)  
            string = string.replace(/\s+$/, '');
            string += '...';
            return string;

        } else {

            return this.message;

        }

    }

}
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

    setCreatedAt(){
        let x = new Date();
        this.created_at = x.getFullYear() + '-';

        if(x.getMonth() < 9){
            this.created_at += '0' + (x.getMonth() + 1) + '-';
        } else {
            this.created_at += (x.getMonth() + 1) + '-';
        }

        if( x.getDate() < 9){
            this.created_at += '0' + (x.getDate() ) + ' ';        
        }else {
            this.created_at += (x.getDate() ) + ' ';
        }

        if(x.getHours() < 10){
            this.created_at += '0' + x.getHours() + ':';
        }
        else {
            this.created_at += x.getHours() + ':';
        }

        if( x.getMinutes() < 10) {
            this.created_at += '0' + x.getMinutes() + ':';
        } else {
            this.created_at += x.getMinutes() + ':';
        }

        if( x.getSeconds() < 10) {
            this.created_at += '0' + x.getSeconds();
        } else {
            this.created_at += x.getSeconds().toString();
        }
    }

}
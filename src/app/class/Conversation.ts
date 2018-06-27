
import { User } from "./User";
import { Message } from "./Message";

export class Conversation {

    public id: Number;
    public users_id: String;
    public updated_at: String;
    public users: Array<User> = [];
    public messages: Array<Message> = [];
    public page: number = 1;

    public unreaded: number = 0;

    constructor() {}

    setData(data) {
        this.id = parseInt(data.id);
        this.users_id = data.users_id;
    }

    setUnreaded(){

        let user = JSON.parse(localStorage.getItem('userData'));

        this.unreaded = 0;

        for(let mes of this.messages){

            if(mes.from_id != user.id && mes.checked == false){

                this.unreaded++;

            }

        }

    }


    getLastMessagePreview() {

        const i = this.messages.length;

        if(i > 0) {

            return this.messages[i - 1].preview();

        } else {

            return null;

        }

    }

    getLastMessageTime() {

        const i = this.messages.length;

        if(i > 0) {

            let time = this.messages[i - 1].created_at;

            return time;

        } else {

            return null;

        }

    }

}
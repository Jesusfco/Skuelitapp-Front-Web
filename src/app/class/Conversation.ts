
import { User } from "./User";
import { Message } from "./Message";

export class Conversation {

    public id: Number;
    public users_id: String;
    public users: Array<User> = [];
    public messages: Array<Message> = [];
    public page: number = 1;

    constructor() {}

    setData(data) {
        this.id = parseInt(data.id);
        this.users_id = data.users_id;
    }

}
export class Storage {
    token: string;
    tokenUrl: string;
    userName: string;
    userEmail: string;
    userId: number;
    userType: number;
    userPhone: string;

    constructor(){
        this.token = localStorage.getItem('token');
        this.tokenUrl = '?token=' + this.token;
    }

    storageToken(token){
        localStorage.setItem('token', token);
    }

    getTokenUrl(){
        return '?token=' + localStorage.getItem('token');
    }

    storageUserData(data){
        localStorage.setItem('userData', JSON.stringify(data));
    }

    getName(){
        let data = JSON.parse(localStorage.getItem('userData'));
        if(data == null || data == undefined) return '';
        return data.name;
    }
    getEmail(){

        let data = JSON.parse(localStorage.getItem('userData'));
        if(data == null || data == undefined) return '';
        return data.email;
    }

    
    getUserType(){
        let data = JSON.parse(localStorage.getItem('userData'));
        if(data == null || data == undefined) return '';
        return data.user_type;
    }

    getUserImg(){
        let data = JSON.parse(localStorage.getItem('userData'));
        if(data == null || data == undefined) return '';
        return data.img;
    }

    
}

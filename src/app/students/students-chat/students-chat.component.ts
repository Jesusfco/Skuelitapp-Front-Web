import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { User } from '../../class/User';
import { Url } from '../../url';
import { UtilsService } from '../../utils.service';
import { Conversation } from '../../class/Conversation';
import { Message } from '../../class/Message';

@Component({
  selector: 'app-students-chat',
  templateUrl: './students-chat.component.html',
  styleUrls: ['./students-chat.component.css']
})
export class StudentsChatComponent implements OnInit {

  public search: String;
  public timer: number = 0;
  public contacts: Array<User> = [];
  public userLog: User = new User();
  public contactsSearch: Array<User> = [];

  public message: Message = new Message();

  public conversation: Conversation = new Conversation();

  public url: Url = new Url();

  constructor( private _http: StudentsService, private util: UtilsService) { 
    
    let data  = JSON.parse(localStorage.getItem('userData'));
    this.userLog.setData(data);

    this.message.from_id = this.userLog.id;

    setTimeout(() => {
      
      var height = window.innerHeight - document.getElementsByTagName('nav')[0].clientHeight;
      var element = document.getElementById('chat');
      element.style.height = height + 'px' ;

      // document.getElementById('bodyMove2').style.padding = '0';
      // document.getElementById('bodyMove2').style.height = height + 'px' ;
    // console.log(element);

    }, 50);
    

    this.setContacts();

  }

  ngOnInit() {
  }

  searchTimer(e) {

    this.contactsSearch = this.searchFilterContacts();

  }

  searchFilterContacts() {
    this.contactsSearch = this.contacts;

    let busqueda = this.search;

    return this.contactsSearch.filter(function(user){
      
      return (user.full_name.includes(busqueda.toUpperCase()));

    });
  }

  setContacts() {

    this._http.getContacts().then(

      data => {

        this.contacts = [];

        for(let d of data) {

          if(d.id == this.userLog.id) continue;

          let user = new User();
          user.setData(d);
          user.setFullName();
          this.contacts.push(user);

        }

        this.contactsSearch = this.contacts;


      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
  }

  selectConversation(contact) {

    this.conversation = new Conversation();

    this.conversation.users.push(contact);
    this.conversation.users.push(this.userLog);


    this.util.getConversation(this.conversation).then(

      data => {

        if(data.id == undefined) {
          // this.createConversation();
          return;

        }

        this.conversation.id = parseInt(data.id);
        this.message.conversation_id = this.conversation.id;
        this.setMessages();

      }, 
      
      error => {
      
        if(error.status == 405) {

        }

      }

    );

  }

  createConversation() {

    this.util.createConversation(this.conversation).then(

      data => {
        this.conversation.id = parseInt(data.id);
      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  setMessages() {

    this.util.getMessages(this.conversation).then(

      data => {

        for(let message of data) {
          let m: Message = new Message();
          m.setData(message);
          this.conversation.messages.push(m);
        }
        
      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
  }

  sendMessage() {

    this.message.message = this.message.message.replace(/\s+$/, '');    

    if(this.message.message == '') return;

    this.generateRamdonId();
    this.message.created_at = this.createdTime();
    let id = this.message.id;

    let mes = new Message();
    Object.assign(mes, this.message)
    this.conversation.messages.push(mes);
    

    this.util.sendMessage(mes).then(

      data => {

        for(let i = 0; i < this.conversation.messages.length; i++){

          if(this.conversation.messages[i].id == id) {

            this.conversation.messages[i].id = parseInt(data.id);
            break;

          }

        }

      }, error => {
        
        sessionStorage.setItem('request', JSON.stringify(error));

        for(let i = 0; i < this.conversation.messages.length; i++){

          if(this.conversation.messages[i].id == id) {

            this.conversation.messages[i].id = this.conversation.messages[i].id - 10;
            break;

          }

        }

      }

    );

    this.message = new Message();

    this.message.conversation_id = this.conversation.id;
    this.message.from_id = this.userLog.id;

  }

  generateRamdonId(){

    this.message.id = Math.random() * -1;

  }

  createdTime() {

    let date = new Date();

    let time;
    if(date.getHours() < 10) {
      time = '0' + date.getHours() + ':';
    } else { 
      time = date.getHours() + ':';
    }

    if(date.getMinutes() < 10) {
      time += '0' + date.getMinutes();
    } else {
      time += date.getMinutes();
    }

    return time;

  }

}

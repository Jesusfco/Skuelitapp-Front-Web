import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Url } from '../url';
import { User } from '../class/User';
import { Message } from '../class/Message';
import { Conversation } from '../class/Conversation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public search: String = '';
  public timer: number = 0;
  public contacts: Array<User> = [];
  public userLog: User = new User();
  public contactsSearch: Array<User> = [];

  public creatingConversation: Boolean = false;

  public audio = new Audio('assets/tone1.mp3');


  public message: Message = new Message();

  public chat: User = new User();

  public url: Url = new Url();

  constructor(private util: UtilsService) { 
    
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

    this.util.channel = this.util.pusher.subscribe('chat-channel.' + this.userLog.id);
    
    this.util.channel.bind('App\\Events\\NewMessage', data => this.pusherChatLogic(data));

  }

  sortChat() {
    this.contacts.sort((a, b) => {

      if(a.conversation.getLastMessagePreview() == null && b.conversation.getLastMessagePreview() == null) {

        return 0;

      } else if(a.conversation.getLastMessagePreview() == null && b.conversation.getLastMessagePreview() != null) {

        return 1;
      }

      else if(b.conversation.getLastMessagePreview() == null && a.conversation.getLastMessagePreview() != null) {

        return -1;

      }
      
      else if(a.conversation.getLastMessageTime() < b.conversation.getLastMessageTime()) {

        return 1;
      
      } else {

        return 0;

      }

    });

    this.searchTimer();
  }

  sortChatCompleteName() {
    this.contacts.sort((a, b) => {
      if(a.full_name < b.full_name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    this.searchTimer();
  }

  pusherChatLogic(data) {

    let mes = new Message();
    mes.setData(data.message);

    let conversation = new Conversation();
    conversation.setData(data.conversation);

      if(conversation.id == this.chat.conversation.id) {

        
        this.chat.conversation.messages.push(mes);
        this.scrollBottomChat();
        this.setMessagesReaded();
        this.sortChat();

      }

      else {

        let checkContact = false;

        for(let i = 0; i < this.contacts.length; i++) {

          if(this.contacts[i].conversation.id == parseInt(data.conversation.id)) {

            this.contacts[i].conversation.messages.push(mes);
            this.contacts[i].conversation.setUnreaded();
            checkContact = true;
            this.audio.play();
            break;

          } else if( this.contacts[i].id == mes.from_id ) {

            this.contacts[i].conversation.setData(data.conversation);
            this.contacts[i].conversation.messages.push(mes);
            this.contacts[i].conversation.setUnreaded();
            checkContact = true;
            this.audio.play();
            break;

          }

        }

        if(checkContact == false) {

          this.getUndefinedContact(mes, conversation);

        } else {

          this.sortChat();

        }

      }

  }

  searchTimer() {

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

    this.util.getContacts().then(

      data => {

        this.contacts = [];

        for(let d of data) {

          if(d.id == this.userLog.id) continue;

          let user = new User();
          user.setData(d);
          user.setFullName();
          this.contacts.push(user);

        }

        // this.sortChatCompleteName();

        this.contactsSearch = this.contacts;


      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
  }

  selectConversation(contact) {

    this.chat = contact;

    if(this.chat.conversation.id != null) {

      this.setMessages();
      this.prepareNewMessage();

    } else {

      this.searchConversation();

    }

    this.scrollBottomChat();

  }

  searchConversation() {

    this.util.getConversation({id1: this.chat.id , id2: this.userLog.id}).then(

      data => {

        if(data.id == undefined) {

          this.prepareNewMessage();
          return;

        }

        this.chat.conversation.id = parseInt(data.id);
        this.prepareNewMessage();
        this.setMessages();

      },
      
      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  prepareNewMessage() {

    this.message = new Message();
    this.generateRamdonId();

    if(this.chat.conversation.id != null)
      this.message.conversation_id = this.chat.conversation.id;

    this.message.from_id = this.userLog.id;

  }

  setMessages() {

    this.util.getMessages(this.chat.conversation).then(

      data => {

        this.chat.conversation.messages = [];

        for(let message of data) {

          let m: Message = new Message();
          m.setData(message);
          this.chat.conversation.messages.push(m);

        }
        this.sortChat();
        this.scrollBottomChat();

        if(this.chat.conversation.unreaded > 0) {

          this.setMessagesReaded();
        }
        
      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );
  }

  sendMessage() {

    this.message.message = this.message.message.replace(/\s+$/, '');    

    // tslint:disable-next-line:curly
    if (this.message.message == '' || this.creatingConversation == true) return;

    this.message.setCreatedAt();
    this.chat.conversation.setUpdatedAt();

    let id = this.message.id;

    let mes = new Message();

    Object.assign(mes, this.message);

    this.chat.conversation.messages.push(mes);
    this.sortChat();
    this.scrollBottomChat();

    if(mes.conversation_id != null) {

      this.postMessage(mes, id);

    } else {

      this.createConversation(mes, id);

    }

    this.prepareNewMessage();

  }

  postMessage(mes, id){

    this.util.sendMessage(mes).then(

      data => {

        for(let i = 0; i < this.chat.conversation.messages.length; i++){

          if(this.chat.conversation.messages[i].id == id) {

            this.chat.conversation.messages[i].id = parseInt(data.id);
            this.chat.conversation.messages[i].conversation_id = this.chat.conversation.id;

            break;

          }

        }

      }, error => {
        
        sessionStorage.setItem('request', JSON.stringify(error));

        for(let i = 0; i < this.chat.conversation.messages.length; i++) {

          if(this.chat.conversation.messages[i].id == id) {

            this.chat.conversation.messages[i].id = this.chat.conversation.messages[i].id - 10;
            this.chat.conversation.messages[i].conversation_id = this.chat.conversation.id;
            break;

          }

        }

      }

    );

  }

  createConversation(mes, id) {

    this.creatingConversation = true;

    this.util.createConversation({id1: this.chat.id , id2: this.userLog.id}).then(

      data => {

        this.chat.conversation.setData(data);

        mes.conversation_id = this.chat.conversation.id;

        this.postMessage(mes, id);

      }, error => {

        sessionStorage.setItem('request', JSON.stringify(error));

        for(let i = 0; i < this.chat.conversation.messages.length; i++) {

          if(this.chat.conversation.messages[i].id == id) {

            this.chat.conversation.messages[i].id = this.chat.conversation.messages[i].id - 10;
            break;

          }

        }

      }

    ).then( () => this.creatingConversation = false );

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

  getMessageNotRead() {
    
  }

  setMessagesReaded() {

    for(let i = 0; i < this.chat.conversation.messages.length; i++) {

      this.chat.conversation.messages[i].checked = true;

    }

    this.chat.conversation.setUnreaded();

    this.util.messageRead(this.chat.conversation).then(

      data => null,
      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  getUndefinedContact(message, conversation) {

    this.util.getUndefinedContact(message.from_id).then(
      
      data => {

        let user = new User();
        user.setData(user);
        user.conversation.setData(conversation);
        user.conversation.messages.push(message);
        user.conversation.setUnreaded();
        this.contacts.push(user);
        this.searchTimer();
        this.sortChat();

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    );

  }

  scrollBottomChat() {
    
    setTimeout( () => {
      var container = document.getElementById("chatS");
      container.scrollTop = container.scrollHeight;
    }, 50);

  }

}

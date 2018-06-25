import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students-chat',
  templateUrl: './students-chat.component.html',
  styleUrls: ['./students-chat.component.css']
})
export class StudentsChatComponent implements OnInit {

  public search: String;
  public timer: number = 0;

  constructor( private _http: StudentsService) { 
    // var  element = document.getElementsByTagName('window');

    setTimeout(() => {
      
      var height = window.innerHeight - document.getElementsByTagName('nav')[0].clientHeight;
      var element = document.getElementById('chat');
      element.style.height = height + 'px' ;
    // console.log(element);

    }, 50);
    

  }

  ngOnInit() {
  }

  searchTimer(e) {
    if(e.keyCode == 13) {
      this.searchConversations();
      return;
    }

    this.timer++;

    setTimeout(() => {
      this.timer--;
    }, 900);

    setTimeout(() => {
      if(this.timer == 0){
        this.searchConversations();
      }
    }, 950);

  }

  searchConversations() {

  }

}

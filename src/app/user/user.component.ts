import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../class/user';
import { Storage } from '../class/storage';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: Array<User> = [];
  public storage: Storage = new Storage();

  public search: any  = {
    word: '',
    page: 1,
    total: 0,
    lastPage: null
  };

  constructor(private _http: UserService) { }

  ngOnInit() {
  }

  searchInput(){

  }

}

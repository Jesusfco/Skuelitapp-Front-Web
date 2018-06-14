import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../class/User';
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
    name: '',
    patern_surname: '',
    matern_surname: '',
    page: 1,
    total: 0,
    lastPage: null
  };

  public timer: number = 0;

  constructor(private _http: UserService) {
    this.searchInput();
  }

  ngOnInit() {
  }

  searchTimer(e) {
    if(e.keyCode == 13) {
      this.searchInput();
      return;
    }

    this.timer++;

    setTimeout(() => {
      this.timer--;
    }, 900);

    setTimeout(() => {
      if(this.timer == 0){
        if(this.search.name.length > 3 || this.search.patern_surname.length > 3 || this.search.matern_surname.length > 3) this.searchInput();
      }
    }, 950);

  }

  searchInput(){

    this._http.getUsers(this.search).then(
      data => {
        this.users = [];
        for(let d of data) {
          const x: User = new User();
          x.setData(d);
          this.users.push(x);
        }
      },
      error => sessionStorage.setItem('request', JSON.stringify(error))
    );

  }

}

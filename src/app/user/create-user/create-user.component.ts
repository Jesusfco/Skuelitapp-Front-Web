import { Component, OnInit } from '@angular/core';
import { User } from '../../class/User';
import { Address } from '../../class/Address';
import { FadeAnimation, SlideAnimation } from '../../animations';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreateUserComponent implements OnInit {

  public user: User = new User();
  public address: Address = new Address();
  public request: Boolean = false;

  public timer: any = {
    email: 0,
  };

  constructor(private _http: UserService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {

  }

  closeWindow(){
    this.router.navigate(['/users']);    
  }

  uniqueEmailWriting(){
    this.timer.email++;

    setTimeout(() => {
      this.timer.email--;
    }, 900);

    setTimeout(() => {
      if(this.timer.email == 0){
        if(this.user.email.length > 7) this.uniqueEmail();
      }
    }, 950);

  }

  uniqueEmail(){
    this._http.checkUniqueEmail(this.user.email).then(
      data => {
        if(data == false){
          this.user.validations.email = 2;
          this.user.validations.validate = false;
        }  
        else { this.user.validations.email = -1; }
      },
      error => console.log(error)
    );
  }


}

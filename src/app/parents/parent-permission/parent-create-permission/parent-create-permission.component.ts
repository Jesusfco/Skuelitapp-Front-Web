import { Component, OnInit, HostListener } from '@angular/core';
import { ParentsService } from '../../parents.service';
import { PermissionRequest } from '../../../class/PermissionRequest';
import { backgroundOpacity, cardPop } from '../../../animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-parent-create-permission',
  templateUrl: './parent-create-permission.component.html',
  styleUrls: ['./parent-create-permission.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class ParentCreatePermissionComponent implements OnInit {

  public permission: PermissionRequest = new PermissionRequest();
  public request: number = 0;

  public formats = ['image/png', 'image/jpeg', 'image/jpg'];
  public files: any = [];
  public input: any;

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }
  }

  constructor(private _http: ParentsService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);
  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['./solicitud-permiso-tutores']);
    }, 350);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  createPermission() {

  }

  getFile(files: FileList) {
    
      for (let i = 0; i < files.length; i++) {

          if (this.validateImageFile(files[i]) ) { continue; }

          this.getElementsFromFile(files[i]);

      }

      this.input = null;

  }

  validateImageFile(file: File) {
    
    let validation = true;

    for (let i of this.formats) {
        if (i == file.type) {
            validation = false;
            break;
        }
    }
    return validation;

  }

  getElementsFromFile(file) {

    let jso = {
        formData: file,
        bits: null,
        status: 0,
        id: 0,
    };


    let reader = new FileReader();
    reader.onload = (e: any) => {
        jso.bits = e.target.result;
        this.pushFile(jso);
    };

    reader.readAsDataURL(file);

  }

  pushFile(jso) {
    this.files.push(jso);
    this.chekId();
    this.nextFileToSend();
  }

  chekId() {

    for (let i = 0; i < this.files.length; i++) {
        this.files[i].id = 'imagePreview' + i;
    }

  }

  nextFileToSend() {

    for (let i = 0; i < this.files.length; i++) {

        if (this.files[i].status == 0) {
            this.sendFile(i);
            break;
        }

    }

  }

  sendFile(i) {

    if (this.request > 0) return;

    this.request++;

    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     progress: function(progressEvent) {
    //         var percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //         app.progress(percent);
    //     }
    // }

    this.files[i].status = 1;
    // this.progress(50);

    this._http.savePermissionImage(this.files[i].formData).then(
      
      data => {

        this.request--;
        this.successUpload(data, i);

    },
  
    error => {

        this.request--;
        this.errorHandler(error, i);

      }

    );

  }

progress(e) {
    let element = document.getElementById('percent');
    element.style.width = e + "%";
}

successUpload(response, i) {

    response = response.data;
    this.files[i].status = 2;
    // this.files.splice(i, 1);

    // let id = response.album_clients_id;

    // let path = response.path.split(' ').join('%20');

    setTimeout(this.nextFileToSend(), 500);
}


errorHandler(response, i) {

    if (this.files[i] == undefined) return;
    
        this.files[i].status = -1;
    

    console.log(response);

    setTimeout(this.nextFileToSend(), 500);

}

}

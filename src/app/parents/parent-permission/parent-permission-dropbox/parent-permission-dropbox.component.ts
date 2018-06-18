import { Component, OnInit, Input, Output } from '@angular/core';
import { ParentsService } from '../../parents.service';
import { PermissionRequest } from '../../../class/PermissionRequest';
import { PermissionRequestPhoto } from '../../../class/PermissionRequestPhoto';

@Component({
  selector: 'app-parent-permission-dropbox',
  templateUrl: './parent-permission-dropbox.component.html',
  styleUrls: ['./parent-permission-dropbox.component.css']
})
export class ParentPermissionDropboxComponent implements OnInit {

  @Input() permission: PermissionRequest;
  public request: number = 0;

  public formats = ['image/png', 'image/jpeg', 'image/jpg'];
  public files: any = [];
  public input: any;

  constructor(private _http: ParentsService) { }

  ngOnInit() {
  }


  getFile(files: FileList) {

    if(this.permission.photos.length >= 5) {

      const error = {
        title: 'El limite es de 5 fotos',
        description: 'Si desea cargar otra foto elimine una',
        status: 450
      };

      sessionStorage.setItem('request', JSON.stringify(error));
      return;
    }
    
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

  if((this.permission.photos.length + this.files.length) >= 5) {

    const error = {
      title: 'El limite es de 5 fotos',
      description: 'Si desea cargar otra foto elimine una',
      status: 450
    };

    sessionStorage.setItem('request', JSON.stringify(error));
    return;
  }

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

  if(this.permission.photos.length >= 5) {

    const error = {
      title: 'El limite es de 5 fotos',
      description: 'Si desea cargar otra foto elimine una',
      status: 450
    };

    sessionStorage.setItem('request', JSON.stringify(error));
    return;
  }

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

  this._http.savePermissionImage(this.files[i].formData, this.permission.id).then(
    
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

    this.files[i].status = 2;
    this.files.splice(i, 1);

    let x: PermissionRequestPhoto = new PermissionRequestPhoto();
    x.setData(response);
    this.permission.photos.push(x);

    setTimeout(this.nextFileToSend(), 500);
}


errorHandler(response, i) {

  if (this.files[i] == undefined) return;
  
      this.files[i].status = -1;
  

  console.log(response);

  setTimeout(this.nextFileToSend(), 500);

}

}

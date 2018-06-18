import { Url } from "../url";

export class PermissionRequestPhoto {
    public id: Number;
    public permission_request_id: Number;
    public img: String;
    public path: String;
    public description: String;

    setData(data) {
        this.id = parseInt(data.id);
        this.permission_request_id = parseInt(data.permission_request_id);
        this.img = data.img.split(' ').join('%20');
        this.description = data.description;

        this.setPath();
    }

    setPath() {
        let url: Url = new Url();
        this.path = url.basicUrl + 'images/aplication/permission/' + this.img;
    }

}
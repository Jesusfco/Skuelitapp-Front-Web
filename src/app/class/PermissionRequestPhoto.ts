export class PermissionRequestPhoto {
    public id: Number;
    public permission_request_id: Number;
    public img: String;
    public description: String;

    setData(data) {
        this.id = parseInt(data.id);
        this.permission_request_id = parseInt(data.permission_request_id);
        this.img = data.img;
        this.description = data.description;
    }
}
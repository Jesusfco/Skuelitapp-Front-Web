export class Address {

    id: Number;
    street: String = '';
    colony: String = '';
    house_number: Number;
    city: String = '';
    CP: String = '';
    created_at: Number;
    updated_at: String;

    constructor() {}

    setData(data) {
        this.id = parseFloat(data.id);
        this.street = data.street;
        this.colony = data.colony;
        this.house_number = parseFloat(data.house_number);
        this.city = data.city;
        this.CP = data.CP;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
    upperStreet() {
        this.street = this.street.toUpperCase();
    }

    upperColony() {
        this.colony = this.colony.toUpperCase();
    }

    upperCity() {
        this.city = this.city.toUpperCase();
    }

    CPFormat(){
        this.CP = this.CP.replace(/\D/g, '');
    }

}
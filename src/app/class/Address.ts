export class Address {

    id: Number;
    street: String = '';
    colony: String = '';
    house_number: Number;
    city: String = '';
    CP: Number;
    created_at: Number;
    updated_at: String;

    constructor() {}

    upperStreet() {
        this.street = this.street.toUpperCase();
    }

    upperColony() {
        this.colony = this.colony.toUpperCase();
    }

    upperCity() {
        this.city = this.city.toUpperCase();
    }

}
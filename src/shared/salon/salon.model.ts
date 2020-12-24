export class Salon {
    
    id: string;
    ownerID: string;
    name: string;
    type: string;
    describe: string;
    hours: string;
    location =  new Location();
    services: Service[];
    rates: Rate[];
    
    hasName() {
        return this.name > '';
    }

    hasType() {
        return this.type != '';
    }

    hasDescribe() {
        return this.describe != '';
    }

}   

export class Location {
    
    id: string;
    city: string;
    code: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;

    hasCity() {
        return this.city != '';
    }

    hasCode() {
        return this.code != '';
    }

    hasStreet() {
        return this.street != '';
    }

    hashouseNumber() {
        return this.houseNumber != '';
    }

}

export class Service {

    id: string;
    offerTitle: string;
    price: string;
    time: string;

    constructor(){
        this.offerTitle = ""
        this.price = ""
        this.time = ""
    }

    hasTitle(){
        return this.offerTitle != '';
    }

    hasTime(){
        return this.time != '';
    }

    hasPrice(){
        return this.price != '';
    }
}   

export class Rate {

    id: string;
    rate: number;

}
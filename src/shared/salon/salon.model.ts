export class Salon {

    id: string;
    ownerID: string;
    name: string;
    type: string;
    describe: string;
    hours: string;
    location: Location[];
    service: Service[];
    rate: Rate[];
    
}

class Location {
    
    id: string;
    city: string;
    code: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;

}

class Service {

    id: string;
    offerTitle: string;
    price: string;
    time: string;

}

class Rate {

    id: string;
    rate: number;

}
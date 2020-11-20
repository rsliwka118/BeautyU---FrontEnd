export class Salon {
    
    id: string;
    ownerID: string;
    name: string;
    type: string;
    describe: string;
    hours: string;
    locations: Location[];
    services: Service[];
    rates: Rate[];

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

export class Rate {

    id: string;
    rate: number;

}
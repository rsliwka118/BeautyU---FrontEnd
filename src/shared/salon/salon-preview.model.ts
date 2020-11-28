export interface Preview {
    
    id: string;
    name: string;
    location: Location;
    rates: Rate[];

}   

interface Location {
    
    id: string;
    city: string;
    code: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;

}

export interface Rate {

    id: string;
    rate: number;

}
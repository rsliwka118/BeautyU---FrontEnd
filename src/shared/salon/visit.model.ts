export interface Visit {
    id: string;
    date: string;
    hour: string;
    status: string;
    salonID: Salon;
    serviceID: Service;
}

interface Salon {
    
    id: string;
    ownerID: string;
    name: string;
    type: string;
    describe: string;
    hours: string;
} 

interface Service {

    id: string;
    offerTitle: string;
    price: string;
    time: string;

}
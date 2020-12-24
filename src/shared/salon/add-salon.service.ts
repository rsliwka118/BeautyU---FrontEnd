import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Config } from "../config";
import { Salon } from "./salon.model";
import { HttpPostService } from "../http/http-post.service";
import { ToastsService } from "../toasts.service";

class Hour {
    open: string
    close: string

    constructor(open,close){
        this.open = open
        this.close = close
    }
}

@Injectable()
export class AddSalonService {

    salon: Salon
    hours: Array<Hour>

    constructor( private post: HttpPostService, private toast: ToastsService ) { 

        this.hours = new Array<Hour>(7)

         for(let i = 0; i<7; i++ )
             this.hours[i] = new Hour("","")

        this.salon = new Salon()
        // this.salon.name = ""
        // this.salon.type = ""
        // this.salon.describe = ""
        
        // this.salon.location.city = ""
        // this.salon.location.code = ""
        // this.salon.location.street = ""
        // this.salon.location.houseNumber = ""
        // this.salon.location.apartmentNumber = ""
        
        this.salon.name = "Fryzjer męski"
        this.salon.type = "Fryzjer"
        this.salon.describe = "Najlepszy fryzjer w mieście!"
        
        this.salon.location.city = "Zielona Góra"
        this.salon.location.code = "65-045"
        this.salon.location.street = "Podgórna"
        this.salon.location.houseNumber = "12a"
        this.salon.location.apartmentNumber = "4"
    }

    public hoursFormat(): string{
        let hours = ""

        for(let i in this.hours) {
            hours += ( this.hours[i].open.length ? this.hours[i].open : "-" ) + "&" + ( this.hours[i].close.length ? this.hours[i].close : "-" ) + "#"

        }

        return hours.slice(0, -1)
    }

    public addNewSalon() {
        return this.post.postData(Config.apiAppURL + "/salon", {
            name: this.salon.name,
            type: this.salon.type,
            describe: this.salon.describe,
            hours: this.hoursFormat(),
            city: this.salon.location.city,
            code: this.salon.location.code,
            street: this.salon.location.street,
            houseNumber: this.salon.location.houseNumber,
            apartmentNumber: this.salon.location.apartmentNumber
        }, true)
    }
}

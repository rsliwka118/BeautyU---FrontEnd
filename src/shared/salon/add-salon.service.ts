import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Config } from "../config";
import { Salon } from "./salon.model";

@Injectable()
export class AddSalonService {

    salon: Salon
    
    constructor( private http: HttpClient ) { 
        this.salon = new Salon()
        
        this.salon.name = ""
        this.salon.type = ""
        this.salon.describe = ""
        
        this.salon.location.city = ""
        this.salon.location.code = ""
        this.salon.location.street = ""
        this.salon.location.houseNumber = ""
        this.salon.location.apartmentNumber = ""
    }
}

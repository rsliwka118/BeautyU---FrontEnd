import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";

import { Salon } from "./salon.model";
import { Config } from "../config";

@Injectable({
    providedIn: "root"
})
export class SalonService {

    salons: Array<Salon>

    constructor( private http: HttpClient, private getService: HttpGetService ) { 
        this.getSalon()
        
    }

    getSalon(){
        this.getService
        .getData(Config.apiAppURL + "/salons", true)
        .subscribe(res => {
          let result = (<any>res)
          this.salons = result
          console.log(this.salons[1].name)
        }, error => {
          console.log(error.error)
        })
        
      }
}

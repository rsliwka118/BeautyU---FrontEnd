import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";

import { Rate, Salon } from "./salon.model";
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
        }, error => {
          console.log(error.error)
        })
        
      }

    public rateAVG(rates: Rate[]){
    
        let sum = 0
        
        for( var i = 0; i < rates.length; i++ ){
            sum += Number(rates[i].rate)
        }
        var avg = sum/rates.length

        return avg
    }
}

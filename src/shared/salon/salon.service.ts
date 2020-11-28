import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, first, map, switchMap, take, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";
import { Rate, Salon } from "./salon.model";
import { Config } from "../config";
import { ObservableArray } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";
import { RouterExtensions } from "@nativescript/angular";

@Injectable({
    providedIn: "root"
})
export class SalonService {


    constructor( private http: HttpClient, private getService: HttpGetService, private router: RouterExtensions) { 
      this.category = ""
    }

    category: string;
    type: number;
    
    public getPreview() {
        let typeUrl: string
        let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "authorization": getString("accessToken")
        })

        switch (this.type) {
          case 0:
              typeUrl = "hairdresser"
              this.category = "Fryzjer"
              break
          case 1:
              typeUrl = "barber"
              this.category = "Barber"
              break
          case 2:
              typeUrl = "beautician"
              this.category = "Makijaż"
              break
          case 3:
              typeUrl = "nails"
              this.category = "Paznokcie"
              break
          case 4:
              typeUrl = "massager"
              this.category = "Masaż"
              break
          case 5:
              typeUrl = "depilation"
              this.category = "Depilacja"
              break
          default:
              console.log("incorrect type")
              break
        }

        return this.http.get(Config.apiAppURL + "/previews/" + typeUrl, {headers: headers})
    }

    public getSalon(id: string){
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "authorization": getString("accessToken")
            })
            
        return this.http.get(Config.apiAppURL + "/salons/" + id, {headers: headers})
    }

    public checkRoute(names: Array<string>): boolean {
      for(let i = 0;i < names.length; i++){
            if(this.router.router.url.includes(names[i])) {
                    return true;
            }
      }
      return false;
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

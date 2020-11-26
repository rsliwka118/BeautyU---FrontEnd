import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, first, map, switchMap, take, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";
import { Rate, Salon } from "./salon.model";
import { Config } from "../config";
import { ObservableArray } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";

export class DataItem {
    title: string;
    body: string;
}

export class Categories {
    title: string
    photo: string
}

@Injectable({
    providedIn: "root"
})
export class SalonService {


    constructor( private http: HttpClient, private getService: HttpGetService ) { 
    }

    public getItems(): Observable<DataItem[]> {
        return this.http.get<DataItem[]>("https://jsonplaceholder.typicode.com/posts")
    }
    
    public getCategories(): Categories[] {
        let categories
        return categories = [
            {
              title: "Fryzjer",
              photo: "res://hair_icon"
            },
            {
              title: "Barber",
              photo: "res://barber_icon"
            },
            {
              title: "Makijaż",
              photo: "res://makeup_icon"
            },
            {
              title: "Masaż",
              photo: "res://massage_icon"
            },
            {
              title: "Paznokcie",
              photo: "res://nails_icon"
            },
            {
              title: "Depilacja",
              photo: "res://depilation_icon"
            }
          ]
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

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class DateService {

    private _date: Date

    constructor( ) { 
        this._date = new Date()
    }

    public getDate(days){
        let date = new Date()
        
        date.setDate( this._date.getDate() + days)
        
        return this.formatDate(date)
    }

    private formatDate(date){
        let mm = String(date.getMonth() + 1).padStart(2, '0')
        let dd = String(date.getDate()).padStart(2, '0')

        return dd + " " + this.monthName(mm)
    }

    private monthName(mm){
        let month

        switch (mm) {
            case "01":
                month ="STY"
                break
            case "02":
                month ="LUT"
                break
            case "03":
                month ="MAR"
                break
            case "04":
                month ="KWI"
                break
            case "05":
                month ="MAJ"
                break
            case "06":
                month ="CZE"
                break
            case "07":
                month ="LIP"
                break
            case "08":
                month ="SIE"
                break
            case "09":
                month ="WRZ"
                break
            case "10":
                month ="PAŹ"
                break
            case "11":
                month ="LIS"
                break
            case "12":
                month ="GRU"
                break    
            default:
                month=""
                break    
        }

        return month
    }
}

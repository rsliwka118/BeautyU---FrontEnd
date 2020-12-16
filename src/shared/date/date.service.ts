import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { SalonService } from "../salon/salon.service";
import { Day } from "./day.model";
import { HttpPostService } from "../http/http-post.service";
import { Config } from "../config";
import { dateProperty } from "@nativescript/core/ui/date-picker";

@Injectable()
export class DateService {

    public _dateCurrent: Date
    public _dateWeek: Date
    public day: Array<Day>
    public dayNumber
    public selectedDate

    constructor( private salonService: SalonService, private post: HttpPostService ) { 
        this._dateCurrent = new Date()
        this._dateWeek = new Date()
        this._dateWeek.setDate( this._dateCurrent.getDate() + 6)
        this.day = []
        this.dayNumber = 0
        this.selectedDate = this.formatFullDate(this._dateCurrent)
    }

    public getStartDate(){
    
        return this.formatDate(this._dateCurrent)

    }

    public getEndDate(){
        
        return this.formatDate(this._dateWeek)
    }

    public nextWeek(){
        this._dateCurrent.setDate( this._dateCurrent.getDate() + 7)
        this._dateWeek.setDate( this._dateWeek.getDate() + 7)
        
        this.getDays()
        this.day[0].isFocus = true
        this.dayNumber = 0
        this.selectedDate = this.formatFullDate(this._dateCurrent)
    }

    public undoWeek(){
        this._dateCurrent.setDate( this._dateCurrent.getDate() - 7)
        this._dateWeek.setDate( this._dateWeek.getDate() - 7)

        this.getDays()
        this.day[0].isFocus = true
        this.dayNumber = 0
        this.selectedDate = this.formatFullDate(this._dateCurrent)
    }

    private formatDate(date){
        let mm = date.getMonth()
        let dd = String(date.getDate()).padStart(2, '0')

        return dd + " " + this.monthName(mm)
    }

    public compareDates(date1, date2) {
        return ( this.formatDate(date1) === this.formatDate(date2) )
    }

    private monthName(mm){
        let months = ["STY","LUT","MAR","KWI","MAJ","CZE","LIP","SIE","WRZ","PAŹ","LIS","GRU"]

        return mm <= 12 ? months[mm] : "Err"
    }

    public formatFullDate(data: Date){
        let dd = String(data.getDate()).padStart(2, '0')
        let mm = String(data.getMonth() + 1).padStart(2, '0')
        let yyyy = data.getFullYear()

        return yyyy + '-' + mm + '-' + dd
    }

    public getDays(){
        let date = new Date(this._dateCurrent)
        let newDt = new Date(date)

        for( let i = 0; i < 7; i++ ) {

            newDt.setDate( newDt.getDate() + ( i === 0 ? 0 : 1 ) )
            this.getAvailableHours( newDt, i )

        }

    }

    private timeArr(arr) {

        if( arr.length ){

            if( arr[0] !== "Wybierz godzinę" )
                arr.unshift("Wybierz godzinę")

        } else {
            if( arr[0] !== "Wybierz godzinę" )
                arr.unshift("Zamknięte")
        }

    }

    private getAvailableHours(date,i){
        let day = new Day()
        let dd = String(date.getDate()).padStart(2, '0')

        this.post.postData(Config.apiAppURL + "/visits/date/" + this.salonService.salonID, {date: this.formatFullDate(date)}, true)
            .subscribe( (res: any) => {

                day.day = dd
                day.isFocus = i === 0 ? true : false
                day.hours = res.availableHours
                
                this.timeArr(day.hours)

                this.day[i] = day
                
            })
    }

    reset(){
        this._dateCurrent = new Date()
        this._dateWeek.setDate( this._dateCurrent.getDate() + 6)
        this.day[0].isFocus = true
        this.dayNumber = 0
    }
}

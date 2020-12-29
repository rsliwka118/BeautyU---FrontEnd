import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { SalonService } from "../salon/salon.service";
import { Day } from "./day.model";
import { HttpPostService } from "../http/http-post.service";
import { Config } from "../config";
import { dateProperty } from "@nativescript/core/ui/date-picker";
import { MySalonService } from "../salon/mysalon.service";

@Injectable()
export class DateService {

    public _dateCurrent: Date
    public _dateWeek: Date
    public day: Array<Day>
    public dayNumber
    public selectedDate
    public mySalon: string

    constructor( private salonService: SalonService, private mySalonService: MySalonService, private post: HttpPostService ) { 
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

    public nextWeek(isSalon){

        this._dateCurrent.setDate( this._dateCurrent.getDate() + 7)
        this._dateWeek.setDate( this._dateWeek.getDate() + 7)
        
        this.getDays(isSalon)
        if(!isSalon) {
            this.day[0].isFocus = true
            this.dayNumber = 0
        }
        this.selectedDate = this.formatFullDate(this._dateCurrent)
    }

    public undoWeek(isSalon){
        this._dateCurrent.setDate( this._dateCurrent.getDate() - 7)
        this._dateWeek.setDate( this._dateWeek.getDate() - 7)

        this.getDays(isSalon)
        if(!isSalon) {
            this.day[0].isFocus = true
            this.dayNumber = 0
        }
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

    public getDays(isSalon: boolean){
        let dateStart = new Date(this._dateCurrent)
        let dateEnd = new Date(this._dateWeek)
        let start = new Date(dateStart)
        let end = new Date(dateEnd)

        if(isSalon){

            this.getAvailableHours( isSalon, start, end, 0 )

        } else {
            for( let i = 0; i < 7; i++ ) {

                start.setDate( start.getDate() + ( i === 0 ? 0 : 1 ) )
                this.getAvailableHours( isSalon, start, end, i )

            }
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

    private getAvailableHours( isSalon: boolean, start, end,i){
        let day = new Day()
        let dd = String(start.getDate()).padStart(2, '0')

        if(isSalon){
            this.post.postData(Config.apiAppURL + "/mysalon/" + this.mySalonService.salonID + "/visits", {start: this.formatFullDate(start), end: this.formatFullDate(end)}, true)
            .subscribe( (res: any) => {

                this.mySalonService.salonVisits = res.visits
                this.mySalonService.salonHistory = res.history
                this.mySalonService.isVisitsEmpty = this.mySalonService.salonVisits.length ? false : true
                this.mySalonService.isHistoryEmpty = this.mySalonService.salonHistory.length ? false : true
                
            })
        } else {
            this.post.postData(Config.apiAppURL + "/visits/date/" + this.salonService.salonID, {date: this.formatFullDate(start)}, true)
            .subscribe( (res: any) => {

                day.day = dd
                day.isFocus = i === 0 ? true : false
                day.hours = res.availableHours
                
                this.timeArr(day.hours)

                this.day[i] = day
                
            })
        }
        
    }

    reset(){
        this._dateCurrent = new Date()
        this._dateWeek.setDate( this._dateCurrent.getDate() + 6)
        this.day[0].isFocus = true
        this.dayNumber = 0
    }
}

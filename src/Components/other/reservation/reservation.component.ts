import { Component, OnInit } from "@angular/core";
import { RouterExtensions} from "@nativescript/angular";
import { ToastsService } from "../../../shared/toasts.service";
import { LocationService } from "../../../shared/location/location.service"
import { UserService } from "../../../shared/user/user.service";
import { EventData, Image, Label, ListPicker, Page, StackLayout, Switch, TouchGestureEventData } from "@nativescript/core";
import { HomeViewModel } from "../../../shared/home-view-model"
import { typeSourceSpan } from "@angular/compiler";
import { AuthService } from "../../../shared/auth/auth.service";
import { getString, setString } from "@nativescript/core/application-settings";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { Config } from "../../../shared/config";
import { SalonService } from "../../../shared/salon/salon.service";
import { Location } from '@angular/common';
import { Service } from "src/shared/salon/salon.model";
import { DateService } from "../../../shared/date/date.service";

@Component({
    selector: 'ns-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
    
    public showSelectTime: boolean

    public selectedService: Service
    public selectedHour = "" 
    public comment = ""
    public actualPage = 0

    constructor(
        private toast: ToastsService,
        private post: HttpPostService,
        private routeLocation: Location,
        private page: Page,
        public userService: UserService,
        public dateService: DateService,
        public location: LocationService,
        public salonService: SalonService
        ) {
            this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.showSelectTime = false
        this.dateService.getDays(false)
    }

    ngOnDestroy() {
        this.dateService.reset() 
    }

    public onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        this.selectedHour = this.dateService.day[this.dateService.dayNumber].hours[picker.selectedIndex]
    }

    public selectDay(number){
        let date = new Date(this.dateService._dateCurrent)
        date.setDate( date.getDate() + number )
        
        this.dateService.selectedDate = this.dateService.formatFullDate(date)
        this.dateService.dayNumber = number

        for( let i = 0; i < 7; i++ ) 
            this.dateService.day[i].isFocus = false

        this.dateService.day[number].isFocus = true

    }

    public cancel(){
        this.routeLocation.back()
    }

    public undo(){
        this.actualPage -= 1
        this.dateService.reset()
        this.dateService.getDays(false)
    }

    public setService(service: Service) {
        this.selectedService = service
        this.actualPage = 1
    }

    public setDate() {
        this.actualPage = 2
    }

    public canUndo() {
        let date = new Date()
        return this.dateService.compareDates( date, this.dateService._dateCurrent )
    }

    public dayStyle( array, active ) {
 
        if( array.length - 1 === 0 ) return "day day-disable"
        else if( active ) return "day day-active"
        else return "day"
    }

    public canSummary(): boolean{
        if( this.selectedHour === "Wybierz godzinę" || 
            this.selectedHour === "Zamknięte" || 
            this.selectedHour === ""
            ) return false
        
        else return true
    }

    public sendVisit() {

        this.post.postData(Config.apiAppURL + "/visits/"+ this.salonService.salonID,
        {   serviceID: this.selectedService.id,
            date: this.dateService.selectedDate,
            hour: this.selectedHour,
            info: this.comment
        }, true)
            .subscribe( (res: any) => {
                this.toast.showToast(res.message)
                this.cancel()
            })
            
    }
}
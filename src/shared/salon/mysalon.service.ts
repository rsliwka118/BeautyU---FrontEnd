import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, of, throwError } from "rxjs";
import { catchError, first, map, switchMap, take, tap } from "rxjs/operators";
import { HttpGetService } from "../../shared/http/http-get.service";
import { Rate, Salon } from "./salon.model";
import { Config } from "../config";
import { ObservableArray } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { openUrl } from "@nativescript/core/utils";
import { HttpPostService } from "../http/http-post.service";
import { ToastsService } from "../toasts.service";
import { HttpDeleteService } from "../http/http-delete.service";

class Hour {
    open: string
    close: string

    constructor(open,close){
        this.open = open
        this.close = close
    }
}

@Injectable({
    providedIn: "root"
})

export class MySalonService {

    public hours: Array<Hour>
    category: string
    type: number
    public favList = []
    public salon: Salon
    public salonID: string
    public salonName: string

    constructor( 
        private http: HttpClient, 
        private getService: HttpGetService,
        private deleteService: HttpDeleteService, 
        private postService: HttpPostService, 
        private router: RouterExtensions,
        private toast: ToastsService
        ) { 
            this.category = ""
            this.salonName = ""
            this.salonID = ""

            this.hours = new Array<Hour>(7)
            this.salon = new Salon()
        
            for(let i = 0; i<7; i++ )
                this.hours[i] = new Hour("","")
        }


    public checkRoute(names: Array<string>): boolean {
        for(let i = 0;i < names.length; i++){
                if(this.router.router.url.includes(names[i])) {
                        return true;
                }
        }
        return false;
    }

    public getLocation(loc): string {
        let _location = 
        loc.city + ", ul. " + 
        loc.street + " " +
        loc.houseNumber +
        (loc.apartmentNumber==="" ? "" : "/" + loc.apartmentNumber)
        
        return _location
    }
    
    public getHours(hours) {
        let hrs = hours.split('#')

        for(let i=0; i < hrs.length; i++){
            hrs[i]=hrs[i].split('&')
        }

        return hrs
    }

    public serviceDone(){
        this.router.navigate(['/menu/my/', this.salonID])
    }

    public hoursFormat(): string{
        let hours = ""

        for(let i in this.hours) {
            hours += ( this.hours[i].open.length ? this.hours[i].open : "-" ) + "&" + ( this.hours[i].close.length ? this.hours[i].close : "-" ) + "#"

        }

        return hours.slice(0, -1)
    }

    public updateInfo() {
        return this.postService.postData( Config.apiAppURL + "/salon/" + this.salonID + "/update/info",
        {
            name: this.salon.name,
            type: this.salon.type,
            describe: this.salon.describe,
            city: this.salon.location.city,
            code: this.salon.location.code,
            street: this.salon.location.street,
            houseNumber: this.salon.location.houseNumber,
            apartmentNumber: this.salon.location.apartmentNumber
        }, true)
    }

    public onItemTap(id,name) {
        this.salonName = name
        this.salonID = id
        this.router.navigate(['/menu/my', this.salonID])

    }
    
}

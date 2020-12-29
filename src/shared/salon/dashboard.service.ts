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
import { SalonVisit } from "./visit.model";

@Injectable({
    providedIn: "root"
})

export class DashboardService {

    minDate: Date = new Date(1975, 0, 29);
    maxDate: Date = new Date(2045, 4, 12);

    constructor( 
        private http: HttpClient, 
        private getService: HttpGetService,
        private deleteService: HttpDeleteService, 
        private postService: HttpPostService, 
        private router: RouterExtensions,
        private toast: ToastsService
        ) {}

    public getRateSource() {
        return [
            { Rate: "5", Rates: 104},
            { Rate: "4", Rates: 30},
            { Rate: "3", Rates: 11},
            { Rate: "2", Rates: 11},
            { Rate: "1", Rates: 2}
        ]
    }

    public getVisitsStatusSource() {
        return [
            { Status: "Canceled", Count: 104},
            { Status: "Finished", Count: 10}
        ]
    }

    onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }
}

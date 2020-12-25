import { Component, OnInit } from "@angular/core";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { Button, EventData } from "@nativescript/core";
import { AddSalonService } from "../../../shared/salon/add-salon.service";
import { DateTimePicker } from "@nativescript/datetimepicker";
import { MySalonService } from "../../../shared/salon/mysalon.service";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { Config } from "../../../shared/config";
import { ToastsService } from "../../../shared/toasts.service";
import { AuthService } from "../../../shared/auth/auth.service";

@Component({
    selector: 'ns-edit-hours',
    templateUrl: './edit-hours.component.html',
    styleUrls: ['./edit-hours.component.css']
})

export class EditHoursComponent implements OnInit {

    public isSelect: boolean[]

    constructor(
        private params: ModalDialogParams, 
        private salon: MySalonService,
        private post: HttpPostService,
        private toast: ToastsService,
        private auth: AuthService
        ) {
    }

    ngOnInit() {}

    submit(){
        this.post.postData(Config.apiAppURL + "/salon/"+ this.salon.salonID +"/update/hours", { hours: this.salon.hoursFormat()}, true)
            .subscribe( (res:any) => {
                this.toast.showToast(res.message)
            })
        this.close()
        this.auth.reloadComponent()
    }

    public onPickTimeTap(args: EventData, day, isOpen): void {
        const dateToday = new Date();
        const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
        dateTomorrow.setHours(8);
        dateTomorrow.setMinutes(0);
        DateTimePicker.pickTime({
            context: (<Button>args.object)._context,
            time: dateTomorrow,
            okButtonText: "OK",
            cancelButtonText: "Cofnij",
            title: isOpen ? "Godzina otwarcia" : "Godzina zamknięcia",
            locale: "en_GB",
            is24Hours: true
        }).then((selectedTime: Date) => {
          
            if (selectedTime) {
                let hour = this.getFormattedTime(selectedTime);
                
                if(isOpen) this.salon.hours[day].open = hour
                else this.salon.hours[day].close = hour
            }
        })
    }

    public getHour(day, isOpen): string {
    if(isOpen) 
        return this.salon.hours[day].open.length ? this.salon.hours[day].open : "Otwarcie"
    else
        return this.salon.hours[day].close.length ? this.salon.hours[day].close : "Zamknięcie" 
    } 

    public resetHour(day) {
        this.salon.hours[day].open = ""
        this.salon.hours[day].close = ""
    }

    getFormattedTime(date: Date): string {
        const h = date.getHours();
        const m = date.getMinutes();
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    }

    close() {
        this.params.closeCallback()
    }
}
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { AddSalonService } from "../../../shared/salon/add-salon.service";

@Component({
    selector: 'ns-set-salon-type',
    templateUrl: './set-salon-type.component.html',
    styleUrls: ['./set-salon-type.component.css']
})

export class SetSalonTypeComponent implements OnInit {

    public isSelect: boolean[]
    public types = ["Hairdresser","Barber","Beautician","Nails","Massager","Depilation"]

    constructor(
        private params: ModalDialogParams, 
        private salon: AddSalonService,
        ) {
       
    }

    ngOnInit() {}

    setType(type: number){

        this.salon.salon.type = this.types[type]

        this.close()
    }

    close() {
        this.params.closeCallback();
    }
}
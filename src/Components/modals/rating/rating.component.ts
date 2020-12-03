import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
    selector: 'ns-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
}
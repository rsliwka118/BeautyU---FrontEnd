import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
    selector: 'ns-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {

    private rate: number
    public isSelect: boolean[]

    constructor(private params: ModalDialogParams) {
        this.rate = 0;
        this.isSelect = [false,false,false,false,false]
    }

    ngOnInit() {}

    addRate(rate: number){
        this.isSelect = [false,false,false,false,false]

        for(let i = 0; i <= rate; i++){
            this.isSelect[i] = true
        }
        this.rate = rate + 1
    }

    sendRate(){
        console.log(this.rate)
    }

    close() {
        this.params.closeCallback();
    }
}
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams} from "@nativescript/angular";
import { ToastsService } from "../../../shared/toasts.service";
import { LocationService } from "../../../shared/location/location.service"
import { UserService } from "../../../shared/user/user.service";
import { EventData, Image, Label, Page, StackLayout, TouchGestureEventData } from "@nativescript/core";
import { HomeViewModel } from "../../../shared/home-view-model"

@Component({
    selector: 'ns-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {

    private rate: number
    public isSelect: boolean[]
    public showWelcome: boolean
    public showAccountType: boolean
    public showLocation: boolean

    constructor(
        private params: ModalDialogParams, 
        private toast: ToastsService,
        public userService: UserService,
        public location: LocationService,
        ) {
    }

    ngOnInit() {
        this.showWelcome = false
        this.showAccountType = true
        this.showLocation = false
    }

    pageLoaded(args: EventData) {
        let page = <Page>args.object;
        page.bindingContext = new HomeViewModel();
    }
    
    next(screen: number){
        switch (screen) {
            case 0:
                this.showWelcome = true
                this.showAccountType = false
                this.showLocation = false
                break
            case 1:
                this.showWelcome = false
                this.showAccountType = true
                this.showLocation = false
                break
            case 2:
                this.showWelcome = false
                this.showAccountType = false
                this.showLocation = true
                break
            default:
                console.log('incorrect page number')
                break    
        }
    }

    public setAccountType(type: string){
        this.next(2)
    }

    public setLocation(){
        
        this.close()
    }

    onTouch(args: TouchGestureEventData) {
        const label = <StackLayout>args.object
        switch (args.action) {
            case 'up':
                label.deletePseudoClass("pressed");
                break;
            case 'down':
                label.addPseudoClass("pressed");
                break;
        }
    }    

    close() {
        this.params.closeCallback();
    }
}
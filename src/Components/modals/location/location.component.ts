import { Component, OnInit } from "@angular/core";
import { ModalDialogParams, RouterExtensions} from "@nativescript/angular";
import { ToastsService } from "../../../shared/toasts.service";
import { LocationService } from "../../../shared/location/location.service"
import { UserService } from "../../../shared/user/user.service";
import { EventData, Image, Label, Page, StackLayout, TouchGestureEventData } from "@nativescript/core";
import { HomeViewModel } from "../../../shared/home-view-model"
import { typeSourceSpan } from "@angular/compiler";
import { AuthService } from "../../../shared/auth/auth.service";
import { getString, setString } from "@nativescript/core/application-settings";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { Config } from "../../../shared/config";

@Component({
    selector: 'ns-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
 
    constructor(
        private toast: ToastsService,
        private params: ModalDialogParams,
        private post: HttpPostService,
        public userService: UserService,
        public location: LocationService,
        ) {
    }

    ngOnInit() {
        this.location.getCities()
    }

    public sendSettings(city: string){

        this.post.postData(Config.apiAuthURL + "/update-settings/"+getString("userID"), {city: city}, true)
            .subscribe( (res: any) => {
                this.location.currentCity = city
                this.toast.showToast(res.message)
            })

        this.close()

    }

    public close(){
        this.params.closeCallback()
    }
    
}
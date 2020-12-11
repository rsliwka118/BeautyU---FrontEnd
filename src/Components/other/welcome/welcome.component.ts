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
    selector: 'ns-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

    private rate: number
    private city: string
    private accountType: string
    public isSelect: boolean[]
    public showWelcome: boolean
    public showAccountType: boolean
    public showLocation: boolean

    constructor(
        private auth: AuthService,
        private routerExtension: RouterExtensions,
        private toast: ToastsService,
        private post: HttpPostService,
        private page: Page,
        public userService: UserService,
        public location: LocationService,
        ) {
            this.page.actionBarHidden = true
    }

    ngOnInit() {
        this.showWelcome = true
        this.showAccountType = false
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
        this.accountType = type
        this.next(2)
    }

    public setLocation(city: string){
        this.city = city
        this.location.currentCity = city
        this.sendSettings()
        this.routerExtension.navigate(['/menu'])
    }

    private sendSettings(){

        this.post.postData(Config.apiAuthURL + "/settings/"+getString("userID"), {accountType: this.accountType, city: this.city}, true)
            .subscribe( (res: any) => {
                this.toast.showToast(res.message)
            })
    }
}
import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { AuthService } from '../shared/token/auth.service'

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private routerExtension: RouterExtensions, public auth: AuthService) {
        if (getString("userID") === undefined){
            auth.isAuthorized = false
            this.routerExtension.navigate(['/login'])
        }
        else{
            auth.isAuthorized = true
            this.routerExtension.navigate(['/tabs'])
            this.auth.getDetails(true)
        }
    }

}

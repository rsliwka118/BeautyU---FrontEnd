import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";
import { AuthService } from '../shared/auth/auth.service'
import { HttpLoaderService } from '../shared/http/http-loader.service'
@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private routerExtension: RouterExtensions, public auth: AuthService, public loaderService: HttpLoaderService) {

        if (getString("userID") === undefined){
            auth.isAuthorized = false
            this.routerExtension.navigate(['/login'])
        }
        else{
            auth.isAuthorized = true
            this.auth.getDetails(true)
            this.routerExtension.navigate(['/menu'])
        }
    }

}

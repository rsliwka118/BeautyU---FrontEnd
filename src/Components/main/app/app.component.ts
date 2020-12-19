import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { getString } from "@nativescript/core/application-settings";
import { LocationComponent } from "../../../components/modals/location/location.component";
import { AuthService } from '../../../shared/auth/auth.service'
import { HttpLoaderService } from '../../../shared/http/http-loader.service'
import * as app from "tns-core-modules/application";
import {
    resumeEvent,
    suspendEvent,
    ApplicationEventData,
    on as applicationOn,
    run as applicationRun } from "tns-core-modules/application";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(
        private routerExtension: RouterExtensions, 
        public auth: AuthService, 
        public loaderService: HttpLoaderService,
        ) {

        applicationOn(suspendEvent, (args: ApplicationEventData) => {
            // args.android is an android activity
            if (args.android) {
                console.log("SUSPEND Activity: " + args.android);
            }
            });
        
            applicationOn(resumeEvent, (args: ApplicationEventData) => {
            if (args.android) {
                console.log("RESUME Activity: " + args.android);
                let window = app.android.startActivity.getWindow();
                window.setSoftInputMode(
                android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN
                );
                // This can be SOFT_INPUT_ADJUST_PAN
                // Or SOFT_INPUT_ADJUST_RESIZE
            }
            });

        if (getString("userID") === undefined){
            auth.isAuthorized = false
            this.routerExtension.navigate(['/login'])
        }
        else{
            auth.isAuthorized = true
            this.auth.getDetails(true)
        }
    }

    ngOnInit(): void{
        
    }

}

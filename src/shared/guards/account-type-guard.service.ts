import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { AuthService } from '../../shared/auth/auth.service'

@Injectable()
export class AccountTypeGuard implements CanActivate {
    constructor(private router: RouterExtensions, private auth: AuthService) { }

    canActivate() {
        if ( getString("accountType") === "Salon" ) {

            return true;
        } else {
            this.router.navigate(['/menu/browser']);
            
            return false;
        }
    }
}
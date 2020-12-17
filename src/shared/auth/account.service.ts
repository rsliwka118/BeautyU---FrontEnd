import { Injectable, NgZone } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { getBoolean, setBoolean,  getNumber, setNumber, getString, setString, hasKey, remove, clear} from "@nativescript/core/application-settings";
import { ToastsService } from "../toasts.service";
import { User } from "../user/user.model";
import { Config } from "../config"
import { HttpPostService } from "../http/http-post.service";
import { tap } from "rxjs/operators";
import { HttpGetService } from "../http/http-get.service";
import { HttpDeleteService } from "../http/http-delete.service";
import { AuthService } from '../../shared/auth/auth.service'
import { UserService } from "../user/user.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable({
  providedIn: "root"
})
export class AccountService {
    
    message: string
    isLoggingIn = true

    constructor(
      private zone: NgZone, 
      private routerExtension: RouterExtensions, 
      private toast: ToastsService,
      private postService: HttpPostService,
      private getService: HttpGetService,
      private deleteService: HttpDeleteService,
      private userService: UserService,
      private auth: AuthService
      ) {}

    checkAccountType(){
      if( getString("accountType") === "Client" ) return false
      if( getString("accountType") === "Salon" ) return true
    }  

    login() {
      this.postService
      .postData(Config.apiAuthURL + "/login", { email: this.userService.user.email, password: this.userService.user.password }, false)
      .subscribe(res => {
        
        let result = (<any>res)

        setString("userID", result.id)
        setString("accessToken", result.accessToken)
        setString("refreshToken", result.refreshToken)
        
        this.toast.showToast('Zalogowano pomyślnie!')
  
        this.auth.isAuthorized = true

        this.auth.getDetails(false)

      }, error => {
        this.toast.showToast(error.error) 
      })
      
    }

    register() {
      this.postService
      .postData(Config.apiAuthURL + "/register", 
        {
          accountType: "Client",
          email: this.userService.user.email,
          firstName: this.userService.user.firstName,
          lastName: this.userService.user.lastName,
          password: this.userService.user.password
        }, false)
      .subscribe(res => {
         
          this.toast.showToast('Zarejestrowano pomyślnie!')
          this.isLoggingIn = true
         
        }, error => {
          this.toast.showToast(error.error)   
        })
    }

    logout(){
      this.deleteService
      .deleteData(Config.apiAuthURL + "/logout", true)
      .subscribe(res => {
  
          this.auth.isAuthorized = false

          this.routerExtension.navigate(['/login'], { clearHistory: true })
                           
          this.userService.user.email = ""
          this.userService.user.firstName = ""
          this.userService.user.lastName = ""
          this.userService.user.password = ""

          clear()  
      }, error => {
        this.toast.showToast(error.error)   
      })
    }

    deleteAccount(){

      dialogs.confirm({
        title: "Usuwanie konta",
        message: "Jeśli usuniesz konto Twoje dane bezpowrotnie znikną z serwisu.\n\nCzy na pewno chcesz usunąć swoje konto?",
        okButtonText: "Tak, usuwam konto",
        cancelButtonText: "Jednak zostaję"
      }).then(result => {

          if(result){
            this.deleteService
            .deleteData(Config.apiAuthURL + "/account/" + getString("userID"), true)
            .subscribe( (res: any) => {
              this.logout()

              this.toast.showToast(res.message)
            })
          }
      })
  }
}

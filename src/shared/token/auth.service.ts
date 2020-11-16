import { Injectable, NgZone } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { getBoolean, setBoolean,  getNumber, setNumber, getString, setString, hasKey, remove, clear} from "@nativescript/core/application-settings";
import { ToastsService } from "../toasts.service";
import { User } from "../user/user.model";
import { Config } from "../../shared/config"

@Injectable()
export class AuthService {
    
    user: User

    isLoggingIn = true
    isAuthorized:boolean

    constructor(private zone: NgZone, private routerExtension: RouterExtensions, public toast: ToastsService) {
        this.user = new User()
        this.user.email = "front@mail.com"
        this.user.password = ""
        this.user.firstName = ""
        this.user.lastName = ""
    }

    async login() {
      const res = await fetch(Config.apiAuthURL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.user.email,
          password: this.user.password
        })
      })
  
      if (res.status == 200) {

        const content = await res.json()
        
        setString("userID", content.id)
        setString("accessToken", content.accessToken)
        setString("refreshToken", content.refreshToken)

        this.toast.showToast('Zalogowano pomyślnie!')
  
        this.isAuthorized = true

        this.getDetails(false)
        this.zone.run(() => {
        this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })
      }
      if (res.status == 400) this.toast.showToast('Nieznany adres email')
      if (res.status == 401) this.toast.showToast('Niepoporawny login lub hasło')
    }
    
    register() {
      fetch(Config.apiAuthURL + "/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          accountType: "Client",
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          password: this.user.password
          })
      }).then(res => {
          if (res.status == 200){ 
              this.toast.showToast('Zarejestrowano pomyślnie!')
              this.isLoggingIn = true
          }   
          else if (res.status == 400) this.toast.showToast('Konto o takim adresie email już istnieje.')
          else if (res.status == 401) this.toast.showToast('Wypełnij poprawnie pola')
          
          })
          .then(result => {})
          .catch(error => {
          console.error('Error:', error);
          });    
    }

    logout(){
      fetch(Config.apiAuthURL + "/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: getString("refreshToken")})
      }).then(res => {
        if (res.status == 204){ 
          this.toast.showToast('Wylogowano')  
          this.isAuthorized = false

          this.routerExtension.navigate(['/login'], { clearHistory: true })
                           
          this.user.email = ""
          this.user.firstName = ""
          this.user.lastName = ""
          this.user.password = ""

          clear()
        }   
      })
        .then(result => {})
        .catch(error => {
        console.error('Error:', error);
        }); 
    }

    async getDetails(checkToken) {
      if(checkToken){
        await this.checkToken()
      }
      const res = await fetch(Config.apiAuthURL + "/details", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "authorization": getString("accessToken")
        },
        body: JSON.stringify({
          userID: getString("userID"),
        })
      })

      if (res.status == 200) {
        this.isAuthorized = true
        const content = await res.json()

        this.user.firstName = content.firstName
        this.user.lastName = content.lastName

        this.zone.run(() => {
        this.routerExtension.navigate(['/menu'], { clearHistory: true })
        })
      } else if(res.status == 403) {
          this.toast.showToast('Twoja sesja wygasła')
          this.isAuthorized = false
          this.zone.run(() => {
          this.routerExtension.navigate(['/login'], { clearHistory: true })
        })
      }
    } 

    async checkToken() {
      const res = await fetch(Config.apiAuthURL + "/checktoken", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "authorization": getString("accessToken")
        }
      })
      if(res.status != 200)
        await this.refreshToken()
      } 

    async refreshToken() { 
      const res = await fetch(Config.apiAuthURL + "/token", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          token: getString("refreshToken")
        })
      })
      
      if(res.status == 200){
        const content = await res.json()
        setString("accessToken", content.accessToken)
      } else {
        this.isAuthorized = false
        this.routerExtension.navigate(['/login'], { clearHistory: true })
      }
    }
}
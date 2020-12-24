import { Component, OnInit } from "@angular/core";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { Service } from "../../../../shared/salon/salon.model";
import { AuthService } from "../../../../shared/auth/auth.service";
import { Config } from "../../../../shared/config";
import { HttpPostService } from "../../../../shared/http/http-post.service";
import { ToastsService } from "../../../../shared/toasts.service";
import { SalonService } from "../../../../shared/salon/salon.service";

@Component({
    selector: 'ns-add-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.css']
})

export class AddServiceComponent implements OnInit {

    private rate: number
    public isSelect: boolean[]
    public newService: Service

    offerTitleError = ""
    timeError = ""
    priceError = ""

    constructor(
        private params: ModalDialogParams, 
        private postService: HttpPostService,
        private salonService: SalonService, 
        private toast: ToastsService,
        private auth: AuthService,
        private router: RouterExtensions
        ) {
        this.rate = 0;
        this.isSelect = [false,false,false,false,false]

        this.newService = new Service()
        }

    ngOnInit() {}

    getOfferTitleError() {
        return this.offerTitleError
    }

    getTimeError() {
        return this.timeError
    }

    getPriceError() {
        return this.priceError
    }

    public offerTitleErrors() {
        const errorMsg = !!this.offerTitleError
        if (!errorMsg) return false
    
        const isValid = this.newService.offerTitle.length > 4
        let error = errorMsg || !isValid
    
        if (isValid) {
    
          this.offerTitleError = ""
          return false
    
        }
        return error
    }

    public timeErrors() {
        const errorMsg = !!this.timeError
        if (!errorMsg) return false
    
        const isValid = this.newService.time.length > 0
        let error = errorMsg || !isValid
    
        if (isValid) {
    
          this.timeError = ""
          return false
    
        }
        return error
    }

    public priceErrors() {
        const errorMsg = !!this.priceError
        if (!errorMsg) return false
    
        const isValid = this.newService.price.length > 0
        let error = errorMsg || !isValid
    
        if (isValid) {
    
          this.priceError = ""
          return false
    
        }
        return error
    }

    updateErrors() {
        
        if( this.newService.hasTitle() ) {

            if(this.newService.offerTitle.length >= 5) this.offerTitleError = ""
            
            else  this.offerTitleError = "Podaj tytuł | 5-50 znaków"
    
        } else {
          this.offerTitleError = "Podaj tytuł | 5-50 znaków"
        }

        this.priceError = this.newService.hasPrice() ? "" : "Podaj cenę"
        this.timeError = this.newService.hasTime() ? "" : "Podaj czas"
    }

    private isValidForm() {
        let isValid
    
        isValid = !!this.offerTitleError || !!this.priceError || !!this.timeError
        
        return !isValid;
    }
    send(){
        if( this.isValidForm() ){
            this.postService.postData(Config.apiAppURL + "/salonsservice/" + this.salonService.salonID, {
                offerTitle: this.newService.offerTitle,
                time: this.newService.time,
                price: this.newService.price
            }, true).subscribe( (res: any) => {
                this.toast.showToast(res.message)
            })
            this.auth.reloadComponent()
            this.close()
        }
        else console.log("ERROR")
    }

    submit(){
        this.updateErrors()

        if(this.isValidForm()) {
            this.updateErrors()
            this.send()
        }
    }

    close() {
        this.params.closeCallback()
    }
}
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { AuthService } from "../../../shared/auth/auth.service";
import { Config } from "../../../shared/config";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { ToastsService } from "../../../shared/toasts.service";

@Component({
    selector: 'ns-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {

    private rate: number
    public isSelect: boolean[]

    constructor(
        private params: ModalDialogParams, 
        private postService: HttpPostService, 
        private toast: ToastsService,
        private auth: AuthService,
        private router: RouterExtensions
        ) {
        this.rate = 0;
        this.isSelect = [false,false,false,false,false]
    }

    ngOnInit() {}

    addRate(rate: number){
        this.isSelect = [false,false,false,false,false]

        for(let i = 0; i <= rate; i++){
            this.isSelect[i] = true
        }
        this.rate = rate + 1
        
    }

    sendRate(){
        
        let salonID = this.router.router.url.replace('/menu/details/','')
        
        this.postService
        .postData(Config.apiAppURL + "/rate/"+ salonID , { id: getString("userID"), rate: this.rate}, true)
        .subscribe(res => {
            let response = <any>res
            this.toast.showToast(response.message)
        }, error => {
            this.toast.showToast(error.error) 
        })
        this.auth.reloadComponent()
        this.close()
    }

    close() {
        this.params.closeCallback();
    }
}
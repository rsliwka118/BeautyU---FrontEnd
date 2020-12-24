import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { getString } from "@nativescript/core/application-settings";
import { AddSalonService } from "../../../shared/salon/add-salon.service";
import { AuthService } from "../../../shared/auth/auth.service";
import { Config } from "../../../shared/config";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { ToastsService } from "../../../shared/toasts.service";
import {isAndroid, isIOS} from "tns-core-modules/platform";
import { DateTimePicker } from "@nativescript/datetimepicker";
import { SalonService } from "../../../shared/salon/salon.service";
import { AddServiceComponent } from "./add-service/add-service.component";
import { HttpGetService } from "../../../shared/http/http-get.service";
import { Service } from "../../../shared/salon/salon.model";
import { ActivatedRoute } from "@angular/router";
import { Page } from "@nativescript/core";
import { HttpDeleteService } from "../../../shared/http/http-delete.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: 'ns-set-salon-service',
    templateUrl: './set-salon-service.component.html',
    styleUrls: ['./set-salon-service.component.css']
})

export class SetSalonServiceComponent implements OnInit {

    public services: Array<Service>

    public isSelect: boolean[]
    public isEmpty = false
    private id: string 
    private sub: any

    constructor( 
        public salon: AddSalonService,
        public salonService: SalonService,
        private route: ActivatedRoute,
        private deleteService: HttpDeleteService,
        private toast: ToastsService,
        private auth: AuthService,
        private routerExtensions: RouterExtensions,
        private page: Page,
        private get: HttpGetService,
        private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef, 
        ) { 
            this.page.actionBarHidden = false;
        }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']
            this.getServices().subscribe( (res: any) => {
                this.services = res
                this.isEmpty = !!this.services.length
            })
        })
    }
    
    getServices(){
        return this.get.getData(Config.apiAppURL + "/mysalon/" + this.id + "/services", true)
    }

    showAddServiceModal(){
        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
          }
          this.modalService.showModal(AddServiceComponent, options);
    }

    done(){
        this.routerExtensions.navigate(['/menu/salon/'])
    }

    removeService(id){
        dialogs.confirm({
            title: "Usuwanie usługi",
            message: "Czy na pewno chcesz usunąć usługę z listy?",
            okButtonText: "Tak",
            cancelButtonText: "Anuluj"
          }).then(result => {
    
              if(result){
                this.deleteService.deleteData(Config.apiAppURL + "/salonsservice/" + id, false).subscribe( (res: any) => {
                    this.toast.showToast(res.message)
                    this.auth.reloadComponent()
                })
              }
          })
    }

}
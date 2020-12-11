import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { UserService } from "../../../shared/user/user.service";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";
import { LocationComponent } from "../../../components/modals/location/location.component";
import { LocationService } from "../../../shared/location/location.service";

@Component({
  selector: 'ns-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public userService: UserService, 
    public account: AccountService,
    public salon: SalonService,
    public location: LocationService,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    private page: Page) {
      this.page.actionBarHidden = false
  }

  public showInfo(){
    
    let options = {
      title: "BeautyU v1.0.0",
      message: "Projekt stworzony w ramach pracy inżynierskiej.\n\nRadosław Śliwka\nUniwersytet Zielonogórski 2020/21",
      okButtonText: "OK"
    }
    alert(options)
  }

  public updateCity(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {}
    }
    this.modalService.showModal(LocationComponent, options)
  }

  ngOnInit(): void {
  }

}

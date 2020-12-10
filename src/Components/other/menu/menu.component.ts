import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";
import { SalonService } from "../../../shared/salon/salon.service";
import { Location } from '@angular/common';
import { LocationComponent } from "../../../components/modals/location/location.component";

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private routerExtension: RouterExtensions,
    public salon: SalonService, 
    private location: Location, 
    public auth: AuthService, 
    private page: Page, 
    public router: RouterExtensions, 
    public activeRoute: ActivatedRoute, 
    public loaderService: HttpLoaderService
    ) {
    this.page.actionBarHidden = true;
  }

  public back(){
    this.location.back();
  }

  ngOnInit() {
  }
}

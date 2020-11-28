import { Component, OnInit } from "@angular/core"
import { BottomNavigation } from "@nativescript/core";
import { getRootView } from "@nativescript/core/application";
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";
import { SalonService } from "../../../shared/salon/salon.service";
import { Location } from '@angular/common';

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public salon: SalonService, private location: Location, public auth: AuthService, private page: Page, public router: RouterExtensions, public activeRoute: ActivatedRoute, public loaderService: HttpLoaderService) {
    this.page.actionBarHidden = true;
  }

  public back(){
    this.location.back();
  }

  ngOnInit() { 
  }
}

import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";
import { SalonService } from "../../../shared/salon/salon.service";
import { Location } from '@angular/common';
import { LocationComponent } from "../../modals/location/location.component";
import { AccountService } from "../../../shared/auth/account.service";

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public routeName = [
    {
      path: "category",
      name: "Kategorie"
    },
    {
      path: "details",
      name: "Szczegóły"
    },
    {
      path: "visits",
      name: "Rezerwacje"
    },
    {
      path: "fav",
      name: "Ulubione"
    },
    {
      path: "account",
      name: "Konto"
    },
    {
      path: "search",
      name: "Szukaj"
    },
    {
      path: "reservation",
      name: "Rezerwacja"
    },
    {
      path: "salon",
      name: "Moje salony"
    },
  ]

  constructor(
    private routerExtension: RouterExtensions,
    public account: AccountService,
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

  public getHeader(){
    
    let name = ""
    
    for( let i = 0; i < this.routeName.length; i++ ) {
      
      if ( this.salon.checkRoute([this.routeName[i].path]) ) { 
        if( this.routeName[i].name === "Kategorie" ) return this.salon.category 
          
        return this.routeName[i].name
      }
      
    }
    return name
  }

  public back(){
    this.location.back()
  }

  ngOnInit() {
  }
}

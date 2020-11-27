import { Component, OnInit } from "@angular/core"
import { BottomNavigation } from "@nativescript/core";
import { getRootView } from "@nativescript/core/application";
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../../shared/auth/auth.service'
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { HttpLoaderService } from "../../../shared/http/http-loader.service";

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page, private router: RouterExtensions, private activeRoute: ActivatedRoute, public loaderService: HttpLoaderService) {
 
  }

  onTabClick(route) {
    this.router.navigate(['/menu/visits'])
  }
  ngOnInit() {
    //this.router.navigate([{ outlets: { browserTab: ["browser"], visitsTab: ["visits"], favTab: ["fav"], accountTab: ["account"] } }], { relativeTo: this.activeRoute });
  }

}

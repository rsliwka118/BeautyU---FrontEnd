import { Component, OnInit } from "@angular/core"
import { BottomNavigation } from "@nativescript/core";
import { getRootView } from "@nativescript/core/application";
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/token/auth.service'
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ns-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page, private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute) {
 
  }

  ngOnInit() {
    this.routerExtension.navigate([{ outlets: { browserTab: ["browser"], visitsTab: ["visits"], favTab: ["fav"], accountTab: ["account"] } }], { relativeTo: this.activeRoute });
  }

}

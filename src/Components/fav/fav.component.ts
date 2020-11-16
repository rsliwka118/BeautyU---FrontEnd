import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/token/auth.service'

@Component({
  selector: 'ns-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page) {

  }

  ngOnInit(): void {

  }

}

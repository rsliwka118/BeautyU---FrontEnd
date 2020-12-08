import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Preview } from "src/shared/salon/salon-preview.model";

@Component({
  selector: 'ns-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public account: AccountService, 
    public salon: SalonService,
    private page: Page) {
      this.page.actionBarHidden = false;
  }

  public favs: Array<Preview>
  _isEmpty = false
  
  get isEmpty() {
    return this._isEmpty
  }
  
  ngOnInit(): void {
    
    if(this.salon.favList.length){
        this.salon.getFav().subscribe( (res: any) => {
          this.favs = res
          this.salon.setFav(this.favs)
          this._isEmpty = ( this.favs.length ) ? true : false
        })
      } 
    }
}

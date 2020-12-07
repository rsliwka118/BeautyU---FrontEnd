import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { Preview } from "../../../shared/salon/salon-preview.model";
import { ListView, ObservableArray } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private page: Page,
    public salon: SalonService,
    private router: RouterExtensions) {
      this.page.actionBarHidden = false
  }
  public salons: Array<Preview>
  _isEmpty = false
  public favList = []

  public onItemTap(id) {
    console.log(id)
    this.router.navigate(['/menu/details', id])
  }

  public onFavTap(salonId: string, isFav){
      if(isFav) this.salon.unfav(salonId)
      else this.salon.fav(salonId)
  }

  get isEmpty() {
    return this._isEmpty
  }

  createFavArray(fav:any){

    for(let i=0; i<fav.length; i++){
      this.favList[i] = fav[i].salon
    }

  }

  setFav(salons){
    for(let i=0; i<salons.length; i++){
      salons[i].isFav = this.salon.isFav(salons[i].id, this.favList)
    }
  }

  ngOnInit(): void {
    let fav: any
    this.salon.getPreview().subscribe( (res: any) => {
      this.salons = res.salons
      fav = res.favorites
      this.createFavArray(fav)
      this.setFav(this.salons)
      this._isEmpty = ( res.salons.length <= 0 ) ? true : false
    })
  }

}

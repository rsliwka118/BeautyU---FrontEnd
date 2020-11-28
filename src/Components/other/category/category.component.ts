import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { ListView, ObservableArray } from "@nativescript/core";
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
    public salon: SalonService) {
      this.page.actionBarHidden = false;
  }
  public salons: Array<Salon>;
  _isEmpty = false;

  public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
  }

  get isEmpty() {
    return this._isEmpty
  }

  ngOnInit(): void {
    this.salon.getPreview().subscribe( (res: any) => {
      this.salons = res.salons;
      this._isEmpty = ( res.salons.length <= 0 ) ? true : false 
    });
  }

}

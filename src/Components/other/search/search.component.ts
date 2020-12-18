import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { Preview } from "../../../shared/salon/salon-preview.model";
import { ListView, ObservableArray, SearchBar } from "@nativescript/core";
import { ModalDialogParams, RouterExtensions } from "@nativescript/angular";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { Config } from "../../../shared/config";
import { getString } from "@nativescript/core/application-settings";
@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private page: Page,
    private post: HttpPostService,
    public salon: SalonService,
    private router: RouterExtensions) {
      this.page.actionBarHidden = false
  }

  searchPhrase: string

  public result: Array<Preview>
  public isEmpty = false
  public onStart: boolean
  
    //Search bar
  onSubmit(args) {
      const searchBar = args.object as SearchBar
      this.search(`${searchBar.text}`)
  }
  
  search(phrase: string){
    this.post.postData(Config.apiAppURL + "/search/" + getString("userID"), { phrase: phrase }, true)
        .subscribe( (res: any) => {
          
          this.onStart = false
          if(res.length === 0){
            this.isEmpty = true
          } else {
            this.result = res
            this.isEmpty = false
          }
        })
  }

  ngOnInit(): void {
    this.onStart = true 
  }
}

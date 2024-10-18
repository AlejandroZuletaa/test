import { Component } from '@angular/core';
import { NavBarComponent } from '@organisms/nav-bar/nav-bar.component';
import { OpenModalsComponent } from '@organisms/open-modals/open-modals.component';
import { SearchComponent } from '@organisms/search/search.component';
import { TableUserComponent } from '@organisms/table-user/table-user.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,TableUserComponent,OpenModalsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

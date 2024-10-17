import { Component } from '@angular/core';
import { ModalAddUserComponent } from '@organisms/modal-add-user/modal-add-user.component';
import { NavBarComponent } from '@organisms/nav-bar/nav-bar.component';
import { SearchComponent } from '@organisms/search/search.component';
import { TableUserComponent } from '@organisms/table-user/table-user.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent,SearchComponent,TableUserComponent,ModalAddUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

import { ModalControllerService } from '@services/modal-controller.service';
import { DeleteUserService } from '@services/delete-user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '@organisms/search/search.component';
import { GatewayService } from '@services/gateway.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,SearchComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  imgIcon = '../../../../assets/static/images.png'

  constructor(private GatewayService: GatewayService, private DeleteUserService:DeleteUserService, private ModalControllerService:ModalControllerService) {}

  itemsNav = [
    {
      action: this.addPerson.bind(this), // referenciar la función directamente
      option: 'Add Person'
    },
    {
      action: this.deletePerson.bind(this), // referenciar la función directamente
      option: 'Delete person'
    },
  ]

  addPerson(): void {
    this.ModalControllerService.openModal();
  }

  deletePerson(): void {
    const users = this.DeleteUserService.getUserSelected();
    this.GatewayService.deleteSelectedUsers(users).then(() => {
      this.DeleteUserService.notifyUsersDeleted(); // Notifica que los usuarios han sido eliminados
    });
  }
}

import { DeleteUserService } from '@services/delete-user.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from 'src/core/interface/userModel';
import { GatewayService } from '@services/gateway.service';
import { SearchComponent } from '@organisms/search/search.component';
import { SearchService } from '@services/search.service';
import { Subscription } from 'rxjs';
import { EmptyStateComponent } from '@organisms/empty-state/empty-state.component';

@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [MatIconModule, CommonModule, SearchComponent,EmptyStateComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss',
})
export class TableUserComponent implements OnInit, OnDestroy {
  users: UserInterface[] = []; // los usuarios
  filteredUsers: UserInterface[] = []; // Lista de usuarios filtrados
  selectedUsers: UserInterface[] = []; // Lista de usuarios seleccionados
  private subscriptions: Subscription[] = []; // suscripciones 

  constructor(
    private GatewayService: GatewayService,
    private searchService: SearchService,
    private DeleteUserService: DeleteUserService
  ) {}

  ngOnInit(): void { // inicializador de funciones
    // Iniciar carga los usuarios
    this.loadUsers();

    // Suscríbete a los cambios del término de búsqueda
    const searchSub = this.searchService.searchTerm$.subscribe((term) => {
      this.filterUsers(term);
    });

    // Suscribirse al evento de eliminación de usuarios
    const deleteUserSub =
      this.DeleteUserService.getDeleteUsersObservable().subscribe(() => {
        this.cleanSelectUserDelete(); // Limpia los usuarios seleccionados y recarga la tabla
      });

    // Agregar suscripciones a la lista
    this.subscriptions.push(searchSub, deleteUserSub);
  }

  loadUsers(): void { // cargar usuarios con mensaje
    // carga los usuarios
    this.GatewayService.getTotalUSers()
      .then((users) => {
        if (users) {
          this.users = users; // Asigna los usuarios obtenidos a la propiedad
          this.filteredUsers = users; // Inicializa la lista filtrada con todos los usuarios
        } else {
          console.error('No se pudieron cargar los usuarios.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error); // Manejo de errores
      });
  }

  filterUsers(searchTerm: string): void { // buscador
    // Filtra los usuarios
    if (searchTerm.trim() === '') {
      // Verifica si el término de búsqueda está vacío
      this.filteredUsers = this.users; // Muestra todos los usuarios
      return;
    }

    if (!searchTerm) {
      this.filteredUsers = this.users; // Si no hay término de búsqueda, muestra todos
      return;
    }

    // Filtra los usuarios basados en el término de búsqueda
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  deleteUser(id: number): void { // eliminar usuario por id
    // elimina un usuario
    this.GatewayService.deleteUserId(id);
    this.loadUsers();
  }

  onCheckboxChange(event: any, user: UserInterface): void { // usuarios seleccionados
    if (event.target.checked) {
      // Si el checkbox está marcado, agregar el usuario a la lista de seleccionados
      this.selectedUsers.push(user);
    } else {
      // Si el checkbox está desmarcado, eliminar el usuario de la lista de seleccionados
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    }
    
    // Actualizar la lista de usuarios seleccionados en el servicio
    this.DeleteUserService.setUserSelected(this.selectedUsers);
  }

  cleanSelectUserDelete(): void { //limpiado de seleccionados 
    // elimina varios usuarios
    this.selectedUsers = []; // Limpiar la lista de seleccionados
    this.loadUsers();
  }

  ngOnDestroy(): void { // Desuscribirse de todas las suscripciones al destruir el componente
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}

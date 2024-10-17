import { Injectable } from '@angular/core';
import { UserInterface } from '@interface/userModel';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor() { }

  selectedUsers: UserInterface[] = []; // Lista de usuarios seleccionados

  private deleteUsersSubject = new Subject<void>(); // Crear un Subject para notificar cuando se eliminen usuarios


  getUserSelected(): UserInterface[] {
    return this.selectedUsers;
  }

  setUserSelected(users: UserInterface[]): void {
    this.selectedUsers = users;  
  }
  
    // Método para emitir el evento cuando se eliminan usuarios
    notifyUsersDeleted(): void {
      this.deleteUsersSubject.next();
    }
  
    // Observable para que otros componentes se suscriban a los eventos de eliminación de usuarios
    getDeleteUsersObservable() {
      return this.deleteUsersSubject.asObservable();
    }
}

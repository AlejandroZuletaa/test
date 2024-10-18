import { Injectable } from '@angular/core';
import { UserInterface } from '@interface/userModel';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  constructor() {}
  private selectedUser?: UserInterface;

  // Método para establecer los datos del usuario seleccionado
   setInfo(user: UserInterface): void {
    this.selectedUser = user;  
  }

  // Método para obtener los datos del usuario seleccionado
  getInfo(): UserInterface | undefined {
    return this.selectedUser;
  }
}

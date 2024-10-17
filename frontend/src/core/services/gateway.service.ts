import { UserInterface } from 'src/core/interface/userModel';
import { UserHttpService } from './userHttp.service';
import { Injectable } from '@angular/core';
import { SweetalertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  constructor(
    private UserHttpService: UserHttpService,
    private SweetalertService: SweetalertService
  ) {}

  async getTotalUSers(): Promise<UserInterface[] | null> {
    try {
      const users = await this.UserHttpService.getUser();
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
      return null;
    }
  };

  async deleteUserId(id: number): Promise<void> {
    try {
      await this.UserHttpService.deleteUserId(id);
      this.SweetalertService.success('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }

  async deleteSelectedUsers(users: UserInterface[]): Promise<void> {
    try {
      await this.UserHttpService.deleteSelectedUsers(users);
      this.SweetalertService.success('Usuarios eliminados con éxito');
    } catch (error) {
      console.error('Error al eliminar usuarios:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }

  async addUser (user:UserInterface):Promise<void>{
    try {
      await this.UserHttpService.addUser(user);
      this.SweetalertService.success('Usuario agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }
}

import { UserInterface } from 'src/core/interface/userModel';
import { UserHttpService } from './userHttp.service';
import { Injectable } from '@angular/core';
import { SweetalertService } from './sweetalert.service';
import { catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  private usersUpdated = new Subject<void>(); // Subject para emitir eventos de actualización

  constructor(
    private UserHttpService: UserHttpService,
    private SweetalertService: SweetalertService
  ) {}

  users: UserInterface[] = [];

  // Método para obtener el observable
  get usersUpdated$() {
    return this.usersUpdated.asObservable();
  }

  getTotalUsers(): Observable<UserInterface[]> {
    return this.UserHttpService.getUser().pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        this.SweetalertService.error('Oops algo falló', 'Ocurrió un error');
        return throwError(() => error);
      })
    );
  }

  async deleteUserId(id: string): Promise<void> {
    try {
      await this.UserHttpService.deleteUserId(id);
      this.SweetalertService.success('Usuario eliminado con éxito');
      this.usersUpdated.next(); // Emitir evento de actualización
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }

  async deleteSelectedUsers(users: UserInterface[]): Promise<void> {
    try {
      await this.UserHttpService.deleteSelectedUsers(users);
      this.SweetalertService.success('Usuarios eliminados con éxito');
      this.usersUpdated.next(); // Emitir evento de actualización
    } catch (error) {
      console.error('Error al eliminar usuarios:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }

  async addUser(user: UserInterface): Promise<void> {
    try {
      await this.UserHttpService.addUser(user);
      this.SweetalertService.success('Usuario agregado con éxito');
      this.usersUpdated.next(); // Emitir evento de actualización
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }

  async updateUser(user: UserInterface): Promise<void> {
    try {
      await this.UserHttpService.updateUser(user);
      this.SweetalertService.success('Usuario actualizado con éxito');
      this.usersUpdated.next(); // Emitir evento de actualización
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      this.SweetalertService.error('Oops algo fallo', 'Ocurrió un error');
    }
  }
}

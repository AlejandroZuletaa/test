import { Injectable } from '@angular/core';
import { UserInterface } from 'src/core/interface/userModel';
import { environment } from 'src/enviroment/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private url = environment.API_URL;
  private user = 'odata/v4/user/';

  // Creación del arreglo de usuarios

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserInterface[]> {
    return this.http
      .get<{ value: UserInterface[] }>(`${this.url}${this.user}getAllUsers`)
      .pipe(
        map((response) => response.value) // Transforma la respuesta para que solo retorne los valores del campo `value`
      );
  }

  async deleteUserId(id: string): Promise<void> {
    // elimina un usuario por id
    try {
      await lastValueFrom(
        this.http.post<{ message: string }>(
          `${this.url}${this.user}deleteUser`,
          { ID: id }
        )
      );
      // Aquí podrías manejar algún mensaje de éxito o actualización de tu estado
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new Error('Ocurrió un error');
    }
  }

  async addUser(user: UserInterface): Promise<void> {
    // Agregar un usuario
    try {
      await lastValueFrom(
        this.http.post<{ message: string }>(
          `${this.url}${this.user}registerUser`,
          {
            Name: user.Name,
            Email: user.Email,
            Phone: user.Phone,
            Age: user.Age,
          }
        )
      );
    } catch (error) {
      console.log('Error al agregar un Usuario', error);
      throw new Error('Ocurrió un error');
    }
  }

  async deleteSelectedUsers(users: UserInterface[]): Promise<void> {
    // Extraer los IDs de los usuarios seleccionados
    const ids = users.map((user) => user.ID);

    // elimina varios usuarios
    try {
      await lastValueFrom(
        this.http.post<{ message: string }>(
          `${this.url}${this.user}deleteUsersIds`,
          {
            ids: ids,
          }
        )
      );
      // Aquí podrías manejar algún mensaje de éxito o actualización de tu estado
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new Error('Ocurrió un error');
    }
  }

  async updateUser(updatedUser: UserInterface): Promise<void> {
    // actualizar el usuario
    try {
      await lastValueFrom(
        this.http.post<{ message: string }>(
          `${this.url}${this.user}updateUser`,
          {
            ID: updatedUser.ID,
            Name: updatedUser.Name,
            Email: updatedUser.Email,
            Phone: updatedUser.Phone,
            Age: updatedUser.Age,
          }
        )
      );
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      throw new Error('Ocurrió un error');
    }
  }
}

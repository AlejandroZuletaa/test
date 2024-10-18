import { Injectable } from '@angular/core';
import { UserInterface } from 'src/core/interface/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  // Creación del arreglo de usuarios
  users: UserInterface[] = [
    {
      id: 1,
      name: 'Neil Sims',
      email: 'neil.sims@example.com',
      phone: 3216549870,
      age: 29,
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: 1234567890,
      age: 35,
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: 9876543210,
      age: 28,
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: 4561237890,
      age: 32,
    },
    {
      id: 5,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: 6543219870,
      age: 40,
    },
  ];

  constructor() {}

  async getUser() { // trae todos los usuarios
    return this.users;
  }

  async deleteUserId(id: number): Promise<void> { // elimina un usuario por id
    this.users = this.users.filter((user) => user.id !== id);
  }

  async addUser(user: UserInterface): Promise<void> { // agrega un usuario
    this.users.push(user);
  }

  async deleteSelectedUsers(users: UserInterface[]): Promise<void> { // elimina varios usuarios
    this.users = this.users.filter((user) => !users.includes(user)); 
  }

  async updateUser(updatedUser:UserInterface): Promise<void> { // actualizar el usuario 
    const index = this.users.findIndex(user => user.id === updatedUser.id); // Encuentra el índice del usuario a actualizar

    if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser }; // Actualiza el usuario con los nuevos datos
    } else {
        throw new Error('User not found'); // Lanza un error si el usuario no se encuentra
    }
  }
}

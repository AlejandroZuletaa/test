import cds, { Request } from '@sap/cds';

export default cds.service.impl(async function () {
  const Users = this.entities.Users;

  if (!Users) {
    console.error('La entidad Users no está definida.');
    throw new Error('La entidad Users no está disponible.');
  }

  // Interface para el usuario
  interface User {
    ID: string;
    Name: string;
    Email: string;
    Phone: string;
    Age: number;
  }

  // Función para registerUser
  this.on('registerUser', async (req: Request) => {
    const data: User = req.data;
    data.Email = data.Email.toLocaleLowerCase(); // correo en minúsculas

    const existingUser = await SELECT.one
      .from(Users)
      .where({ Email: data.Email });
    if (existingUser)
      return req.error(400, 'El correo electrónico ya está en uso.');

    const newUser: User = {
      ID: cds.utils.uuid(),
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
      Age: data.Age,
    };

    await INSERT.into(this.entities.Users).entries(newUser);
    req.reply('Usuario creado con éxito');
  });

  // Función para deleteUser
  this.on('deleteUser', async (req: Request) => {
    const { ID } = req.data;

    const result = await DELETE.from(Users).where({ ID });

    if (result === 0) return req.error(404, 'Usuario no encontrado.');
    req.reply('Usuario eliminado con éxito');
  });

  // Función para getAllUsers
  this.on('getAllUsers', async (req: Request) => {
    const allUsers = await SELECT.from(Users);
    req.reply(allUsers);
  });

  // Función para updateUser
  this.on('updateUser', async (req: Request) => {
    const { ID, Name, Email, Phone, Age } = req.data as User;

    const existingUser = await SELECT.one.from(Users).where({ ID });
    if (!existingUser) return req.error(404, 'Usuario no encontrado.');

    const updatedUser = await UPDATE(Users)
      .set({
        Name: Name || existingUser.Name,
        Email: Email ? Email.toLowerCase() : existingUser.Email,
        Phone: Phone || existingUser.Phone,
        Age: Age || existingUser.Age,
      })
      .where({ ID });

    if (updatedUser === 0)
      return req.error(500, 'Error al actualizar el usuario.');
    req.reply('Usuario actualizado con éxito');
  });

  // Función para deleteUsersIds
  this.on('deleteUsersIds', async (req: Request) => {
    const { ids } = req.data as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return req.error(400, 'Se debe proporcionar un array de IDs válido.');
    }

    const result = await DELETE.from(Users).where({ ID: { in: ids } });
    if (result === 0)
      return req.error(404, 'No se encontraron usuarios para eliminar.');
    req.reply(`${result} usuario(s) eliminado(s) con éxito`);
  });
});

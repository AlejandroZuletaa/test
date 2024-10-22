const cds = require("@sap/cds");
const cors = require("cors");

module.exports = cds.service.impl(async function () {
  const { Users } = this.entities;
  // Lógica para registerUser
  this.on("registerUser", async (req) => {
    const { Name, Email, Phone, Age } = req.data;

    const existingUser = await SELECT.one
      .from(Users)
      .where({ Email: Email.toLowerCase() });

    if (existingUser)
      return req.error(400, "El correo electrónico ya está en uso.");

    const newUser = {
      ID: cds.utils.uuid(),
      Name,
      Email: Email.toLowerCase(),
      Phone,
      Age,
    };

    await INSERT.into(Users).entries(newUser);
    req.reply("Usuario creado con éxito");
  });

  // Lógica para deleteUser
  this.on("deleteUser", async (req) => {
    const { ID } = req.data;

    // Elimina al usuario con el ID proporcionado
    const result = await DELETE.from(Users).where({ ID });

    // Verifica si se eliminó algún registro
    if (result === 0) {
      return req.error(404, "Usuario no encontrado.");
    }

    req.reply("Usuario eliminado con éxito");
  });

  // Lógica para getAllUsers
  this.on("getAllUsers", async (req) => {
    const allUsers = await SELECT.from(Users);
    req.reply(allUsers);
  });

  // Lógica para updateUser
  this.on("updateUser", async (req) => {
    const { ID, Name, Email, Phone, Age } = req.data;

    // Verificar si el usuario existe antes de actualizar
    const existingUser = await SELECT.one.from(Users).where({ ID });

    if (!existingUser) {
      return req.error(404, "Usuario no encontrado.");
    }

    // Actualizar el usuario con los nuevos datos
    const updatedUser = await UPDATE(Users)
      .set({
        Name: Name || existingUser.Name, // Si no se proporciona un nuevo valor, mantener el valor existente
        Email: Email ? Email.toLowerCase() : existingUser.Email,
        Phone: Phone || existingUser.Phone,
        Age: Age || existingUser.Age,
      })
      .where({ ID });

    if (updatedUser === 0) {
      return req.error(500, "Error al actualizar el usuario.");
    }

    req.reply("Usuario actualizado con éxito");
  });

  // Lógica para deleteUsersIds
  this.on("deleteUsersIds", async (req) => {
    const { ids } = req.data; // Esperamos que 'ids' sea un array de IDs

    // Verificar que se haya proporcionado un array de IDs
    if (!Array.isArray(ids) || ids.length === 0) {
      return req.error(400, "Se debe proporcionar un array de IDs válido.");
    }

    // Eliminar usuarios cuyos IDs están en el array
    const result = await DELETE.from(Users).where({ ID: { in: ids } });

    // Verificar si se eliminaron registros
    if (result === 0) {
      return req.error(404, "No se encontraron usuarios para eliminar.");
    }

    req.reply(`${result} usuario(s) eliminado(s) con éxito`);
  });
});

using { sap.capire.managerUser.Users as UsersDb } from '../db/schema';


service UserService @(impl: './user.service') {
    
    // Proyección de la entidad Users en el servicio
    entity Users as projection on UsersDb;

    // Definición de la acción registerUser
    action registerUser(
        Name: String, 
        Email: String, 
        Phone: String, 
        Age: Integer
    ) returns String;

    // Definición de la acción deleteUser por ID
    action deleteUser(ID: UUID) returns String;

    // Definición de la acción getAllUsers
    action getAllUsers() returns array of Users;

    // Definicion de la accion update por ID

    action updateUser(
        ID:String,
        Name: String, 
        Email: String, 
        Phone: String,
        Age: Integer
        
    ) returns String;
}

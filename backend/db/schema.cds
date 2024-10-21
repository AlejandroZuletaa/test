using { managed } from '@sap/cds/common';

namespace sap.capire.managerUser;

entity Users : managed {
    key ID: UUID;          
    Name: String;        
    Email: String @Unique;       
    Phone: String;
    Age: Integer; 
}

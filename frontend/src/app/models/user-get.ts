import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Role } from "./role";

export class UserGet {
    userID?:number;
    username?:string ;
    password?:string ;
    name?: string;
    surname?: string;
    pid?: string ;

    //POTREBNO DA SE IZLISTAJU(PREGLED)
    role?:Role;
    doctor?:Doctor;
    patient?:Patient;
}

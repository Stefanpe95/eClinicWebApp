import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserAdd } from '../models/user-add';
import { UserGet } from '../models/user-get';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private getAllUsersURL="http://localhost:4444/api/v1/getAllUsers";
private addUserURL="http://localhost:4444/api/v1/addUser";
private getUserURL="http://localhost:4444/api/v1/getUserById";
private updateUserURL="http://localhost:4444/api/v1/updateUser";
private deleteUserURL="http://localhost:4444/api/v1/deleteUser";
private loginUserURL="http://localhost:4444/api/v1/login";
private getUserByRoleNameURL="http://localhost:4444/api/v1/getUsersByRoleName";

  constructor(private httpClient: HttpClient) { }


  getUsersList():Observable<UserGet[]>{
    return this.httpClient.get<UserGet[]>(this.getAllUsersURL);
  }

  addUser(user:UserAdd):Observable<UserAdd>{
    return this.httpClient.post(this.addUserURL,user);
  }

  getUserById(id:number):Observable<UserGet>{
    return this.httpClient.get<UserGet>(`${this.getUserURL}/${id}`);
  };

  updateUser(id:number,user:UserAdd):Observable<UserAdd>{
    return this.httpClient.put(`${this.updateUserURL}/${id}`,user);
  }

  deleteUser(id:number):Observable<any>{
    return this.httpClient.delete(`${this.deleteUserURL}/${id}`);
  }

  login(user:UserAdd):Observable<UserAdd>{
    return this.httpClient.post(this.loginUserURL,user);
  }

  getUsersByRoleName(rolename:any):Observable<UserGet[]>{
    return this.httpClient.get<UserGet[]>(`${this.getUserByRoleNameURL}/${rolename}`);
  }
  
}

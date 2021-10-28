import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private getAllRolesURL="http://localhost:4444/api/v1/getAllRoles";

  constructor(private httpClient: HttpClient) { }
  
  getRolesList():Observable<Role[]>{
    return this.httpClient.get<Role[]>(this.getAllRolesURL);
  }
}

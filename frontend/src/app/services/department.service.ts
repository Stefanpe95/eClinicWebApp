import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private getAllDepartmentsURL="http://localhost:4444/api/v1/getAllDepartments";

  constructor(private httpClient: HttpClient) { }
  
  getDepartmentsList():Observable<Department[]>{
    return this.httpClient.get<Department[]>(this.getAllDepartmentsURL);
  }
}

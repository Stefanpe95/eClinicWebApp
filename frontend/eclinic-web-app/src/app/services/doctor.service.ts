import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private getAllDoctorsURL="http://localhost:4444/api/v1/getAllDoctors";

  constructor(private httpClient: HttpClient) { }
  
  getDoctorsList():Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(this.getAllDoctorsURL);
  }

}

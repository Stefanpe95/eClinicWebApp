import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private getAllPatientsURL="http://localhost:4444/api/v1/getAllPatients";

  constructor(private httpClient: HttpClient) { }
  
  getPatientsList():Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(this.getAllPatientsURL);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddAppointment } from '../models/add-appointment';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private getAllAppointmentsURL="http://localhost:4444/api/v1/getAllAppointments";
  private addAppointmentURL="http://localhost:4444/api/v1/addAppointment";
  private getAppointmentURL="http://localhost:4444/api/v1/getAppointmentbyId";
  private getAppointmentbyDoctorIdURL="http://localhost:4444/api/v1/getAppointmentsbyDoctorId";
  private getAppointmentbyPatientIdURL="http://localhost:4444/api/v1/getAppointmentsbyPatientId";
  private updateAppointmentURL="http://localhost:4444/api/v1/updateAppointment";
  private deleteAppointmentURL="http://localhost:4444/api/v1/deleteAppointment";

  constructor(private httpClient: HttpClient) { }
  
  getAppointmentsList():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(this.getAllAppointmentsURL);
  }

  addAppointment(appointment:AddAppointment):Observable<AddAppointment>{
    return this.httpClient.post(this.addAppointmentURL,appointment);
  }

  getAppointmentById(id:number):Observable<Appointment>{
    return this.httpClient.get<Appointment>(`${this.getAppointmentURL}/${id}`);
  };

  getAppointmentsbyDoctorId(doctorid:number):Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.getAppointmentbyDoctorIdURL}/${doctorid}`);
  }

  getAppointmentsbyPatientId(patientid:number):Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.getAppointmentbyPatientIdURL}/${patientid}`);
  }

  updateAppointment(id:number,user:AddAppointment):Observable<AddAppointment>{
    return this.httpClient.put(`${this.updateAppointmentURL}/${id}`,user);
  }

  deleteAppointment(id:number):Observable<any>{
    return this.httpClient.delete(`${this.deleteAppointmentURL}/${id}`);
  }

}

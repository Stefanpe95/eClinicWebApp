import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments:Appointment[]=[];
  keyRole=localStorage['currentRole'];

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private appointmentService:AppointmentService,private router:Router) { }

  ngOnInit(): void {
    this.appointments=[];
    if(localStorage['currentRole']=='doctor') {this.getAppointmentsByDoctorId();}
    else if(localStorage['currentRole']=='patient'){ this.getAppointmentsByPatientId();}
    //this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.getAppointmentsList().subscribe(data=>{
      this.appointments=data;

    });
  }

  getAppointmentsByDoctorId(){
    this.appointmentService.getAppointmentsbyDoctorId(localStorage['currentDoctorPatient']).subscribe(data=>{
      this.appointments=data;
      console.log(data);
    });
  }

  getAppointmentsByPatientId(){
    this.appointmentService.getAppointmentsbyPatientId(localStorage['currentDoctorPatient']).subscribe(data=>{
      this.appointments=data;
      console.log(data);
    });
  }

  appointmentDetails(appointmentID?:number){
    this.router.navigate(['appointment-details',appointmentID]);
  }


 updateAppointment(appointmentID?:number){
    this.router.navigate(['update-appointment',appointmentID]);
  }

  deleteAppointment(appointmentID?:any){
    this.appointmentService.deleteAppointment(appointmentID).subscribe(data=>{
      if(this.appointments == null){
        this.router.navigate(['']);
      }
      if(localStorage['currentRole']=='doctor') {this.getAppointmentsByDoctorId();}
      else if(localStorage['currentRole']=='patient'){ this.getAppointmentsByPatientId();}
      // this.getAppointments();
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAppointments();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAppointments();
  }

}

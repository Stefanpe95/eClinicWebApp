import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerContent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AddAppointment } from 'src/app/models/add-appointment';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {


  @ViewChild('picker') picker: any;

  public date:Date=new Date();
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  public enableMeridian = false;
  public minDate: any;
  public maxDate: any;
  public stepHour = 1;
  public stepMinute = 15;

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  

appointmentadd:AddAppointment=new AddAppointment();

  doctor?:number;
  patient?:number;
  doctors:Doctor[]=[];
  patients:Patient[]=[];
  booleanDoctor?:boolean;
  booleanPatient?:boolean;

    myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
    }

    error:string="Clinic doesn't work for weekend (please change appointment on workdays) ";
  
    AppointmentForm = new FormGroup({
      Date: new FormControl(''),
      AppointmentNote: new FormControl(''),
      Patient: new FormControl(''),
      Doctor: new FormControl(''),
    });
  
    PatientValidation:FormControl=new FormControl();
    DoctorValidation:FormControl=new FormControl();

  constructor(private appointmentService:AppointmentService,
              private doctorService:DoctorService,
              private patientService:PatientService, 
              private router:Router) { }

  ngOnInit(): void {

    this.appointmentadd=new AddAppointment();
    this.getDoctorList();
    this.getPatientsList();

    if(localStorage['currentRole']=='doctor'){
      this.doctor=localStorage['currentDoctorPatient'];
      console.log("doctorid "+this.doctor);
      this.appointmentadd.doctorid=this.doctor;
      this.booleanDoctor=true;
      this.booleanPatient=false;
      this.DoctorValidation.disable();

    }
    else if(localStorage['currentRole']=='patient'){
      this.patient=localStorage['currentDoctorPatient'];
      console.log("patientid "+this.patient);
      this.appointmentadd.patientid=this.patient;
      this.booleanDoctor=false;
      this.booleanPatient=true;
      this.PatientValidation.disable();
    }


  }


  getDoctorList(){
    this.doctorService.getDoctorsList().subscribe(data=>{
      this.doctors=data;
    })
    }
  
    getPatientsList(){
      this.patientService.getPatientsList().subscribe(data=>{
        this.patients=data;
      })
    }

    selectOptionDoctor(event:any) {
      console.log(event.target.value);
      this.appointmentadd.doctorid=event.target.value;
    }

    selectOptionDate(event:any){

      this.appointmentadd.date=event.target.value;
    }
  
    selectOptionPatient(event:any) {
      console.log(event.target.value);
      this.appointmentadd.patientid=event.target.value;

  
    }

    saveUser(){
      this.appointmentService.addAppointment(this.appointmentadd).subscribe(element=>{
        console.log(element);
        this.gotToAppointmentList();
      },error=> console.error());
    }
  
    gotToAppointmentList(){
      window.location.reload();
    }

    onSubmit(){
      console.log(this.appointmentadd);
      this.saveUser();
      window.confirm("Successfuly added an appointment!")
    }
}

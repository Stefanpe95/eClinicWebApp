import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAdd } from 'src/app/models/user-add';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { RoleService } from 'src/app/services/role.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  useradd:UserAdd=new UserAdd();

  role?:number;
  doctor?:number;
  patient?:number;
  doctors:Doctor[]=[];
  patients:Patient[]=[];
  roles:Role[]=[];


  error:string='';

  UserForm = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl(''),
    Name: new FormControl(''),
    Surname: new FormControl(''),
    PID: new FormControl(''),
    Role:new FormControl('')
  });

  RoleValidation:FormControl=new FormControl();
  DoctorValidation:FormControl=new FormControl();
  PatientValidation:FormControl=new FormControl();

  constructor(private userService:UserService,
              private doctorService:DoctorService,
              private patientService:PatientService,
              private rolesService:RoleService,
              private router:Router) { }

  ngOnInit(): void {
    this.useradd=new UserAdd();
    this.getDoctorList();
    this.getPatientsList();
    this.getRolesList();
  }

  selectOptionRole(event:any) {
    //getted from event
    console.log(event.target.value);
    this.useradd.roleid=event.target.value;

    //getted from binding
  }

  selectOptionDoctor(event:any) {
    //getted from event
    console.log(event.target.value);
    this.useradd.doctorid=event.target.value;



    //getted from binding


  }

  selectOptionPatient(event:any) {
    //getted from event
    console.log(event.target.value);
    this.useradd.patientid=event.target.value;
    //getted from binding

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

  getRolesList(){
    this.rolesService.getRolesList().subscribe(data=>{
      this.roles=data;

    })
  }

  saveUser(){
    this.userService.addUser(this.useradd).subscribe(element=>{
      console.log(element);
      this.gotToUserList();
    },error=> console.error());
  }

  gotToUserList(){
    this.router.navigate(['/users-list']);
  }

  onSubmit(){

   //console.warn(this.UserForm.value);
    if(this.useradd.doctorid == undefined && this.useradd.patientid == undefined){
      this.error="YOU HAVE TO CHOOSE ONE!(DOCTOR OR PATIENT)"
      return;
    }
    if(this.useradd.doctorid !== undefined && this.useradd.patientid !== undefined){
      this.error="CANT CHOSE BOTH FIELDS(DOCTOR AND PATIENT)!"
      this.DoctorValidation.reset();
      this.PatientValidation.reset();

      console.log( this.useradd.doctorid);
      console.log( this.useradd.patientid);
      this.useradd.doctorid=undefined;
      this.useradd.patientid=undefined;
      return;
    }

    this.saveUser();
  }



}

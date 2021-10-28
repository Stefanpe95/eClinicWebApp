import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UserAdd } from 'src/app/models/user-add';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id?:any;
  useradd: UserAdd=new UserAdd();

  role?:number;
  doctor?:number;
  patient?:number;
  doctors:Doctor[]=[];
  patients:Patient[]=[];
  roles:Role[]=[];

  keyRole=localStorage['currentRole'];

  RoleValidation:FormControl=new FormControl();
  DoctorValidation:FormControl=new FormControl();
  PatientValidation:FormControl=new FormControl();

  constructor(private userService:UserService,
    private doctorService:DoctorService,
    private patientService:PatientService,
    private rolesService:RoleService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['userID'];
    this.getRolesList();
    this.getDoctorList();
    this.getPatientsList();

    this.userService.getUserById(localStorage['currentUser']).subscribe(data =>{
      console.log(data);
      this.useradd = data;

      this.role=data.role?.roleID;
      this.doctor=data.doctor?.doctorID;
      this.patient=data.patient?.patientID;

    });

    if(localStorage['currentRole'] == 'doctor'){
      this.RoleValidation.disable();
    }

    if(localStorage['currentRole'] == 'patient'){
      this.RoleValidation.disable();
      this.PatientValidation.disable();
    }


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
    this.useradd.patientid=undefined;

    //getted from binding


  }

  selectOptionPatient(event:any) {
    //getted from event
    console.log(event.target.value);
    this.useradd.patientid=event.target.value;
    this.useradd.doctorid=undefined;
    //getted from binding

  }

  getRolesList(){
    this.rolesService.getRolesList().subscribe(data=>{
      this.roles=data;

    })
  }

  getDoctorList(){
  this.doctorService.getDoctorsList().subscribe(data=>{
    this.doctors=data;
    this.useradd.patientid=undefined;
  })
  }

  getPatientsList(){
    this.patientService.getPatientsList().subscribe(data=>{
      this.patients=data;
    })
  }



  onSubmit(){

    this.useradd.roleid=this.role;
    //this.useradd.doctorid=this.doctor;
    //this.useradd.patientid=this.patient;

    this.updateUser();
   
  }

  updateUser(){
    this.userService.updateUser(localStorage['currentUser'], this.useradd).subscribe( data =>{
      console.log(data);
      this.useradd=new UserAdd();
      this.goToHomePage();
     // this.goToUserList();

    });
  }

  goToHomePage(){
    this.router.navigate(['']);
  }

  goToUserList(){
    this.router.navigate(['users-list']);
  }

}

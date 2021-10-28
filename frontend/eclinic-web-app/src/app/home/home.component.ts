import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGet } from '../models/user-get';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  key=localStorage['currentUser'];
  user:UserGet=new UserGet();
  flagRole!:string;
  flagDoctor?:number;
  flagPatient?:number;
  clickedDataInfo=false;
  clickedListOfAppointments=false;
  clickedScheduleAppointment=false;
  onceBool=false;

  ngOnInit(): void {
    if(localStorage.length == 0){this.router.navigate(['login']).then(() => {
      window.location.reload();
    });}

    this.checkRole();
  }

  //na osnovu provere u sustini otkljucati i zakljucati odredjene stranice(admin ili korisnik)
  checkRole(){
    this.userService.getUserById(this.key).subscribe(data=>{
      this.user=data;
      this.flagRole=data.role?.roleName!;
      localStorage.setItem('currentRole',this.flagRole);

      if(localStorage['currentRole']=='doctor') {
        this.flagDoctor=data.doctor?.doctorID;
        localStorage.setItem('currentDoctorPatient',JSON.stringify(this.flagDoctor));
        localStorage['currentDoctorPatient']= parseInt(localStorage['currentDoctorPatient'])
      }
      else if(localStorage['currentRole']=='patient'){
        this.flagPatient=data.patient?.patientID;
        localStorage.setItem('currentDoctorPatient',JSON.stringify(this.flagPatient));
        localStorage['currentDoctorPatient']= parseInt(localStorage['currentDoctorPatient'])
      }

     
    })

  }

  logout(name?:string){
    if(window.confirm(name+",are you sure you want to logout?")){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    localStorage.removeItem('currentDoctorPatient');
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }
  }

  dataInfoFill(){
    if(this.clickedDataInfo == false){
      this.clickedDataInfo=true;
      }else this.clickedDataInfo=false;
    this.clickedListOfAppointments=false;
    this.clickedScheduleAppointment=false;

  }

  listofAppointmentsFill(){
    if(this.clickedListOfAppointments == true) {
      this.clickedListOfAppointments=false;
    }
    else this.clickedListOfAppointments=true;
    this.clickedDataInfo=false;
    this.clickedScheduleAppointment=false;
  }

  scheduleAppointmentFill(){
    if(this.clickedScheduleAppointment == true) this.clickedScheduleAppointment=false;
    else this.clickedScheduleAppointment=true;
    this.clickedDataInfo=false;
    this.clickedListOfAppointments=false;
  }

}

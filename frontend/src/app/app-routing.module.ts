import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './shared/add-appointment/add-appointment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './shared/add-user/add-user.component';
import { AppointmentDetailsComponent } from './shared/appointment-details/appointment-details.component';
import { AppointmentListComponent } from './shared/appointment-list/appointment-list.component';
import { DoctorListComponent } from './shared/doctor-list/doctor-list.component';
import { PatientListComponent } from './shared/patient-list/patient-list.component';
import { RoleListComponent } from './shared/role-list/role-list.component';
import { UpdateAppointmentComponent } from './shared/update-appointment/update-appointment.component';
import { UpdateUserComponent } from './shared/update-user/update-user.component';
import { UserDetailsComponent } from './shared/user-details/user-details.component';
import { UserListComponent } from './shared/user-list/user-list.component';


const routes: Routes = [
  {path:"home/:currentUser",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"users-list",component:UserListComponent},
  {path:"add-user",component:AddUserComponent},
  {path:"add-appointment",component:AddAppointmentComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:"doctors-list",component:DoctorListComponent},
  {path:"appointments-list",component:AppointmentListComponent},
  {path:"patients-list",component:PatientListComponent},
  {path:"roles-list",component:RoleListComponent},
  {path:"update-user/:userID",component:UpdateUserComponent},
  {path:"update-appointment/:appointmentID",component:UpdateAppointmentComponent},
  {path:"appointment-details/:appointmentID",component:AppointmentDetailsComponent},
  {path:"user-details/:userID",component:UserDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

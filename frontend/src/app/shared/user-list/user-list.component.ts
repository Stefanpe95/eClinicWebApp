import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UserGet } from 'src/app/models/user-get';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {

  roleSearch?:string;
  users: UserGet[]=[];
  path='update-user';



  UserForm = new FormGroup({
    Role:new FormControl('')
  });

  RoleValidation:FormControl=new FormControl();


  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    if(localStorage.length == 0) this.router.navigate(['login'])
    this.getUsers();

  }

  onChange(){
    console.log(this.roleSearch);
    if(this.roleSearch?.length == 0 || this.roleSearch == undefined) this.getUsers();
    else this.getUsersByRoleName();
  }

  private getUsersByRoleName(){
    this.userService.getUsersByRoleName(this.roleSearch).subscribe(data=>{
     this.users=data;
    })
  }

  private getUsers(){
    this.userService.getUsersList().subscribe(data=>{
      this.users=data;
    })
  }

  userDetails(userID?:number){
    this.router.navigate(['user-details',userID]);
  }


 updateUser(userID?:number){
    this.router.navigate(['update-user',userID]);
  }

  deleteUser(userID?:any){
    this.userService.deleteUser(userID).subscribe(data=>{
      console.log(data);
      this.getUsers();
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getUsers();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userid!:number;
  user?:User;
  

  constructor(private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.userid=this.route.snapshot.params['userID'];

    this.user=new User();
    this.userService.getUserById(this.userid).subscribe(data =>{
      this.user=data;
    })
  }

}

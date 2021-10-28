import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserAdd } from '../models/user-add';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title!:string;
  user?: UserAdd=new UserAdd();
  errorMessage='';
  comp:AppComponent=new AppComponent();

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
     this.comp.title=this.title;
    if(localStorage.length != 0) this.router.navigate(['home/:currentUser'])
    else this.user=new UserAdd();
  }

  
    login() {

      console.log('Button is pressed:', this.user);
      this.userService.login(this.user!).subscribe(
        response => {
          console.log('response:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage['currentUser']=parseInt(localStorage['currentUser']);
          console.log('local storage: ',localStorage);
          this.router.navigate(['/home',localStorage['currentUser']])

          this.router.navigate(['home/:currentUser']).then(() => {
            window.location.reload();
          });
          //izbegnem da prikazem userID(iako ga lokalno pamtim)
          //redirekcija na home page
          

        }, error => {
          console.log(error);
          this.errorMessage = "Wrong username or password";
        }

      )

    }

}

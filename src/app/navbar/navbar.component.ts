import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/service/data.service';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  userData:any;
  email:any;
  name:any;
  isAdmin:any;
  users: any;
  user = new User();
  data:any;
  id:any;
  constructor(private router:Router, private dataService:DataService, private Route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.Route.snapshot.params['id'];
    this.getUserData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.name = this.userData.user.name;    
    this.email = this.userData.user.email;
    this.isAdmin = this.userData.user.isAdmin;
    //console.log(this.isAdmin);
  }
  logout (){
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
   }
   getUserData(){
    this.dataService.getData().subscribe(res => {
      this.users=res;
    }
      );
  }
  back(){
    if (this.isAdmin === 1){
      this.router.navigate(['/dashboard']);
    }
  else if (this.isAdmin === 0){
    this.router.navigate(['/']);
    }
  }
  calendrier(){
    if (this.isAdmin === 1){
      this.router.navigate(['/dashboard/calendrier'], {
        skipLocationChange: true,
      });
    }
  else if (this.isAdmin === 0){
    this.router.navigate(['home/calendrier'], {
      skipLocationChange: true,
    });
    }  }
    employee(){
      if (this.isAdmin === 1){
        this.router.navigate(['/dashboard/employes'], {
          skipLocationChange: true,
        });
      }
    }
    heure(){
      if (this.isAdmin === 1){
        this.router.navigate(['/dashboard/heure'], {
          skipLocationChange: true,
        });
      }
    }
}
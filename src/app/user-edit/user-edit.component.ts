import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/service/data.service';
import { ActivatedRoute, Route } from '@angular/router';
import { User } from '../user';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  token:any;
  userData:any;
  email:any;
  name:any;
  isAdmin:any;
  users: any;
  user = new User();
  data:any;
  id:any;
  constructor(private Route:ActivatedRoute, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.Route.snapshot.params['id'];
    this.getUserData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.name = this.userData.user.name;    
    this.email = this.userData.user.email;
    this.isAdmin = this.userData.user.isAdmin;
  }
  getUserData(){
    this.dataService.getUserById(this.id).subscribe(res => {
     // console.log(res);
     this.data = res ;
     this.user = this.data;
    })
  }
  profileUpdate(){
    this.dataService.updateUser(this.id,this.user).subscribe(res => {

    });
}
logout (){
  localStorage.removeItem('token');
  this.router.navigate(['/login']); 
 }

}
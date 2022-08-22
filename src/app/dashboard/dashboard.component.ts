import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/service/data.service';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  }
  getUserData(){
    this.dataService.getData().subscribe(res => {
      this.users=res;
    }
      );
  }
}

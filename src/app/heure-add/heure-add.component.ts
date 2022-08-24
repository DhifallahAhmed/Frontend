import { Component, OnInit } from '@angular/core';
import { Hour } from 'app/hour';
import { DataService } from 'app/service/data.service';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-heure-add',
  templateUrl: './heure-add.component.html',
  styleUrls: ['./heure-add.component.css']
})
export class HeureAddComponent implements OnInit {
  hourData:any;
  hours:any;
  hour = new Hour();
  data:any;
  users:any;
  user = new User();
  id: any;
  token: any;
  userData: any;
  name: any;
  email: any;
  isAdmin: any;
  maDate: any;
  maDate1: any;
  db:any;
  fn:any;
  constructor(private datePipe: DatePipe,private router:Router, private dataService:DataService, private Route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.Route.snapshot.params['id'];
    this.getUserData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.name = this.userData.user.name;    
    this.email = this.userData.user.email;
    this.isAdmin = this.userData.user.isAdmin;
  }
  getHourData(id:any){
    this.dataService.getHourData(this.hour.user_id).subscribe(res => {
      this.hours=res;
    }
      );
  }
  insert(){

    
    if (this.hour.date_fin > this.hour.date_debut && this.hour.tache != null && this.hour.user_id != null && this.hour.date_debut!=null && this.hour.date_fin!=null){
      this.db = this.hour.date_debut.substring(11,13);
      this.fn = this.hour.date_fin.substring(11,13);
            
      if (this.db > '16' && this.fn < '23'){
        
      this.dataService.insertHour(this.hour).subscribe(res => {
        this.data = res;  
    });
    }
  else {
    alert('Les heures doivent etre entre 17:00 et 22:00');
  }}
   else {
    alert('Vérifiez Les coordonnées');
   }
  }
getUserData(){
  this.dataService.getData().subscribe(res => {
    this.users=res;
  }
    );
}
}
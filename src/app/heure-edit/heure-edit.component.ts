import { Component, OnInit } from '@angular/core';
import { Hour } from 'app/hour';
import { User } from '../user';
import { DataService } from 'app/service/data.service';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-heure-edit',
  templateUrl: './heure-edit.component.html',
  styleUrls: ['./heure-edit.component.css']
})
export class HeureEditComponent implements OnInit {
  data:any;
  id:any;
  hour = new Hour();
  hours:any
  user = new User();
  users:any;
  db:any;
  fn:any;
  constructor(private dataService:DataService, private Route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.Route.snapshot.params['id'];
    this.getHourData();
    this.getUserData();

  }
  getHourData(){
    this.dataService.getHourById(this.id).subscribe(res => {
     // console.log(res);
     this.data = res ;
     this.hour = this.data;
    })
  }
  update(){
    this.db = this.hour.date_debut.substring(11,13);
    this.fn = this.hour.date_fin.substring(11,13);
          
    if (this.db > '16' && this.fn < '23'){
    this.dataService.updateHour(this.id,this.hour).subscribe(res => {
    });
  }
  else{
    alert('Vérifiez les coordonnées');
  }
}
getUserData(){
  this.dataService.getData().subscribe(res => {
    this.users=res;
  }
    );
}
}
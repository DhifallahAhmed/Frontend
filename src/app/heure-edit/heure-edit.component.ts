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
    this.dataService.updateHour(this.id,this.hour).subscribe(res => {
    });
}
getUserData(){
  this.dataService.getData().subscribe(res => {
    this.users=res;
  }
    );
}
}
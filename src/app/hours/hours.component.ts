import { Component, OnInit } from '@angular/core';
import { Hour } from 'app/hour';
import { DataService } from 'app/service/data.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MustMatch } from 'app/confirmed.validator';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  hourData:any;
  hours:any;
  hour = new Hour();
  date:any;
  form:FormGroup;
  submitted = false;
  data: any;
  users: any;
  token:any;
  userData:any;
  email:any;
  name:any;
  isAdmin:any;
  user = new User();
  id:any;
  constructor(private Route:ActivatedRoute, private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router:Router) { }
  createForm(){
    this.form = this.formBuilder.group({
     name: [null, Validators.required],
     email: [null, [Validators.required, Validators.email]],
     password: [null, [Validators.required, Validators.minLength(6)]],
     confirmPassword: [null, Validators.required]},
     {
      Validators: MustMatch('password', 'confirmPassword')
     
  
    });
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);    
    this.email = this.userData.user.email;
    this.name = this.userData.user.name;
    this.isAdmin = this.userData.user.isAdmin;
    //console.log(this.email,this.name,this.isAdmin);
    this.getUserData();
  }
  ngOnInit(): void {
    this.createForm();
    this.id = this.Route.snapshot.params['id'];
    this.getUserData();
    this.getHourData(this.id) ;  
  }
  getHourData(id:any){
    
    this.dataService.getHourData(this.userData.user.user_id).subscribe(res => {
      this.hours=res;
    }
      );
  }
  deleteHour(id:any) {
    this.dataService.deleteHour(id).subscribe(res => {
      this.getHourData(id);
    }
      );

  }
  add(){
      this.router.navigate(['/dashboard/addHeure'], {
        skipLocationChange: true,
      });
    }
    getUserData(){
      this.dataService.getData().subscribe(res => {
        this.users=res;
      }
        );
    }
  }

import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'app/confirmed.validator';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data: any;
  users: any;
  user = new User();
  token:any;
  userData:any;
  email:any;
  name:any;
  isAdmin:any;
  id:any;
  constructor(private Route:ActivatedRoute,private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router:Router) { }
    createForm(){
    this.form = this.formBuilder.group({
     name: [null, Validators.required],
     email: [null, [Validators.required, Validators.email]],
     password: [null, [Validators.required, Validators.minLength(6)]],
     confirmPassword: [null, Validators.required]},
     {
      Validators: MustMatch('password', 'confirmPassword')
     
  
    });
    this.id = this.Route.snapshot.params['id'];
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);    
    this.email = this.userData.user.email;
    this.name = this.userData.user.name;
    this.isAdmin = this.userData.user.isAdmin;
    //console.log(this.email,this.name,this.isAdmin);
    this.getUserData();
  }
  ngOnInit(): void {
    {
      this.createForm();
      this.getUserData();
    }
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
 
   deleteUser(id:any) {
     this.dataService.deleteUser(id).subscribe(res => {
     this.getUserData();
     });
   }
 
 
 registerUser() {
   this.dataService.registerUser(this.user).subscribe(res => {
     this.getUserData();
   }
     );
 
 }
 add(){
  if (this.isAdmin === 1){
    this.router.navigate(['/dashboard/add'], {
      skipLocationChange: true,
    });
  }
}
}
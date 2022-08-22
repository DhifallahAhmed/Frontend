import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'app/confirmed.validator';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
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
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService, private router:Router) { }
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
  }
  get f(){
    return this.form.controls;
  }
  submit(){
    this.submitted = true ;
    if(this.form.invalid){
      return;
    }
    this.dataService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1)
      {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
          timeOut: 2000,
          progressBar: true
        } );
      } else {
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),
        {
          timeOut: 2000,
          progressBar: true
        } );
      }
      this.submitted = false ;
      this.form.get('name')?.reset();
      this.form.get('email')?.reset();
      this.form.get('password')?.reset();
      this.form.get('confirmPassword')?.reset();
    });
  }
  getUserData(){
    this.dataService.getData().subscribe(res => {
      this.users=res;
    }
      );
  }
  logout (){
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
   }

}

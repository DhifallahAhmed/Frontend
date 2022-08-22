import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any;
  form:FormGroup;
  submitted = false ;
  token:any;
  isAdmin:any;
  constructor(private dataService:DataService, private toastr:ToastrService, private formBuilder:FormBuilder, private router:Router) { }
  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }
  ngOnInit(): void {
    this.loginForm();
  }
  get f() {
    return this.form.controls;
  }
  submit(){
    this.submitted = true ;
    if(this.form.invalid){
      return;
    }
    this.dataService.login(this.form.value).subscribe((res: any) => {

      this.data = res
    // console.log(res);
         
    if(this.data.status === 1){
      this.token = this.data.data.token;
      
        localStorage.setItem('token', this.token);
      
      if(this.data.isAdmin === 1){
      this.router.navigate(['/dashboard']);
      this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
      {
        timeOut: 2000,
        progressBar: true
      });}
      else if(this.data.isAdmin === 0){
        this.router.navigate(['/'], {
          skipLocationChange: true,
        });
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
        {
          timeOut: 2000,
          progressBar: true
        });}
     } else if (this.data.status === 0) {
      this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),
      {
        timeOut: 2000,
        progressBar: true
      });
     }
    });

  }
  register(){
    this.router.navigate(['/register']); 
   }
}

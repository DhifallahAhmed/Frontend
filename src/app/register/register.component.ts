import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MustMatch } from '../confirmed.validator';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data: any;
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
  login(){
    this.router.navigate(['/login']); 
   }
}

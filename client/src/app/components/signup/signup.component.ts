import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  error = "";
  success = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': ['', [Validators.required, this.validateUsername]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password': ['', [Validators.required]],
        'firstname': ['', [Validators.required]],
        'lastname': ['', [Validators.required]]
      })
    });

  }

  ngOnInit() {
  }

  validateUsername(control: FormControl): { [s: string]: boolean } {
    return null;
  }

  onSubmit() {
    this.userService.signup(this.myForm.value.userData).subscribe(res => {
      if (res.status == 'OK') {
        this.error = "";
        this.success = "Account has been created successfully. You can login now.";
      } else {
        this.error = res.error;
        this.success = "";
      }
    });
  }

}

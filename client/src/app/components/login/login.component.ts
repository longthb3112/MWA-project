import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  error = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': ['', [Validators.required]],
        'password': ['', [Validators.required]]
      })

    })
  }

  onSubmit() {
    this.userService.login(this.myForm.value.userData).subscribe(res => {
      if (res.status == 'OK') {
        this.error = "";
        let token = res.data.token;
        let fullName = res.data.name;
        let username = this.myForm.value.userData.username;
        localStorage.setItem('token', token);
        localStorage.setItem('name', fullName);
        localStorage.setItem('username', username);
        this.router.navigate(['/task']);

      } else {
        this.error = res.error;
      }
    });
  }

  ngOnInit() {

  }

}

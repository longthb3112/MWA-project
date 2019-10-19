import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {


  public canvas: any;
  public ctx;
  public chartEmail;
  public userInfo;

  myForm: FormGroup;
  error = "";
  success = "";



  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'username': [localStorage.getItem('username'), [Validators.required, this.validateUsername]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'firstname': ['', [Validators.required]],
        'lastname': ['', [Validators.required]],
        'description': ['', [Validators.required]]
      })
    });


  }
  validateUsername(control: FormControl): { [s: string]: boolean } {
    return null;
  }
  onSubmit() {
    this.userService.updateuser(this.myForm.value.userData).subscribe(res => {
      if (res.status == 'OK') {
        this.userService.getUserdetail().subscribe(data => this.userInfo = data.data);
        this.error = "";
        this.success = "Account has been updated successfully.";
      } else {
        this.error = res.error;
        this.success = "";
      }
    });
  }





  ngOnInit() {
    this.userService.getUserdetail().subscribe(data => this.userInfo = data.data);
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
          ],
          borderWidth: 0,
          data: [33, 33, 34]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }
}

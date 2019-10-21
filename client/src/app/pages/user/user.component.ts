import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  public closed = 0;
  public opening = 0;
  public late = 0;
  public total = 0;

  myPicForm: FormGroup;

  myForm: FormGroup;
  error = "";
  success = "";



  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {
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


    this.myPicForm = formBuilder.group({
      'foto': ['', [Validators.required]],
      'picture': ['', [Validators.required]]
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
        this.showNotification('top', 'right');
      } else {
        this.error = res.error;
        this.success = "";
      }
    });
  }

  images;

  selectImage(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.onSubmitPic();

    }
  }

  showNotification(from, align) {

    this.toastr.success(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><br />Profile has been Updated Successfully!!!<br/><br/></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
  }



  onSubmitPic() {
    const formData = new FormData();
    formData.append('profilepic', this.images);
    formData.append('username', localStorage.getItem('username'));



    this.userService.updatePic(formData).subscribe(res => {
      this.userService.getUserdetail().subscribe(data => this.userInfo = data.data);
      if (res.status == 'OK') {


        this.error = "";
        this.success = "Account has been updated successfully.";
      } else {
        this.error = res.error;
        this.success = "";
      }
    });



  }



  ngOnInit() {
    this.userService.getUserdetail().subscribe(data => {

      this.userInfo = data.data;


      for (let task of data.data.tasks) {
        if (task.status === 1) this.closed++;
        else if (task.status === 0) this.opening++;
        else this.late++;
      }
      this.total = data.data.tasks.length;


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
              '#73C8CD',
              '#F4C76A',
              '#E2865F',
            ],
            borderWidth: 0,
            data: [this.closed, this.opening, this.late]
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


    );



  }






}

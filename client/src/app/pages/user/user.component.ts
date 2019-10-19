import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    public canvas : any;
    public ctx;
    public chartEmail;

    ngOnInit(){
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
              data: [342, 480, 53]
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

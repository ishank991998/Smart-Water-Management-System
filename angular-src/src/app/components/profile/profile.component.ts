import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
//import {Chart} from '../../../../node_modules/chart/dist/Chart.min';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data1 = [];
  time = [];
  user = JSON;
  x = String;
  totalData : Number;

  constructor(
    private authService: AuthService,
    private router : Router
    //private chart : Chart
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.totalData = 0;
      this.user = profile.user;
      for(var i in profile.user.waterData){
        let data = profile.user.waterData[i].data;
        this.data1.push(data);
        this.totalData = this.totalData+data;
        let time = (profile.user.waterData[i].time);
        this.time.push(new Date(Date.now()));
      }
      this.x = profile.user.name;
    //  this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
    
  const Chart = require('../../../../node_modules/chart/dist/Chart.min.js');  

  console.log(this.time);
  console.log(this.data1);
    let myChart = document.getElementById('myChart'); 
    let dataChart = new Chart(myChart, {
      type: 'line' ,
      data : {
        labels : this.time,
        datasets : [{
          label: 'Water Conumption',
        data: this.data1,
        }]
      },
      options:{
        responsive: true
      }
    });

  }

  


}

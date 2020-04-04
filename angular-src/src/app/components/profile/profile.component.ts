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

  constructor(
    private authService: AuthService,
    private router : Router
    //private chart : Chart
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      for(var i in profile.user.waterData){
        this.data1.push(profile.user.waterData[i].data);
        this.time.push(profile.user.waterData[i].time);
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
        
      }
    });

  }

  


}

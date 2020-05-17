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
    var tData;
    this.authService.getProfile().subscribe(profile => {
      tData = 0;
      this.user = profile.user;
      for(var i in profile.user.waterData){
        let data = profile.user.waterData[i].data;
        this.data1.push(data);
        tData = tData+data;
        let time = (profile.user.waterData[i].time);
        var time1 = new Date(time).toLocaleString('en-US', {timeZone: 'Asia/Calcutta'})
        this.time.push(time1);
      }
      this.x = profile.user.name;
    this.totalData = tData;
    },
    err => {
      console.log(err);
      return false;
    });
    
    const Chart = require('../../../../node_modules/chart/dist/Chart.min.js');  
    var color;

    if(tData < 500){
      color = 'rgba(0,0,255,0.5)'
    }
    else if( tData < 1000 && tData > 500){
      color = 'rgba(255,165,0,0.5)'
    }
    else {
      color = 'rgba(255,0,0,0.5)'
    }
    
    var myChart = document.getElementById('myChart'); 
    var dataChart = new Chart(myChart, {
      type: 'line' ,
        data : {
          labels : this.time,
          datasets : [{
            label: 'Water Conumption',
            data: this.data1,
            borderColor: color,
            backgroundColor: color,
          }]
        },
        options : {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip : true,
              maxTicksLimit : 10
            }
          }]
      }
    }
    
    });

  dataChart.update();
    
  }
}

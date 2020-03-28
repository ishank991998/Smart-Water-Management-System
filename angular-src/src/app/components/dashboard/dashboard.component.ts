import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String;
  data: Number;
  time: Date;
  tempUser : Object;  
  tU: Object;
  
  constructor(
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
    //username:  this.authService.getUsername(),// this.tempUser[property],
    data: this.data
    }
    console.log('in Register submit');
    //console.log(user.username + '....' + user.data);

    this.authService.storeWaterData(user);
  }
}

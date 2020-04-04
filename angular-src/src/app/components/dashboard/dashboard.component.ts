import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data : Number;
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
     
    ) { }

  ngOnInit() {
  }

  onDataSubmit(){
    const user = {
    username: this.authService.getUsername(),  
    data: this.data
    }
    console.log('in Data submit');
    //console.log(user.username + '....' + user.data);

    this.authService.storeWaterData(user).subscribe((data1: any) => {
      if(data1.success){
        console.log('Inside subscribe data');
        this.flashMessage.show('Data stored successfully' , {cssClass:'alert-success',timeout:3000});
        
      } else {
        this.flashMessage.show("Something went wrong" , {cssClass:'alert-danger',timeout:3000});
        
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data : Number

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onDataSubmit(){
    this.authService.registerData(this.data).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Data Stored', {
          cssClass : 'alert-success',
          timeout : 5000});        
        
      }else{
        this.flashMessage.show(data.msg, {
          cssClass : 'alert-danger',
          timeout : 5000});         
      }
    });
  }
}

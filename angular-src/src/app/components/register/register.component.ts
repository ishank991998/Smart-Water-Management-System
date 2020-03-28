import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  phoneNum: String;
  address: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log('Button Clicked')
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      phoneNum: this.phoneNum,
      address: this.address
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all the fields',{cssClass:'alert-danger',timeout:3000});
      return false;
    }
   
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please fill in the email correctly' , {cssClass:'alert-danger',timeout:3000});
      return false;
    }

    this.authService.registerUser(user).subscribe((data:any) => {
      if(data.success){
        console.log('Inside success');
        this.flashMessage.show('You are now registered and can log in' , {cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("Something went wrong" , {cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }
}

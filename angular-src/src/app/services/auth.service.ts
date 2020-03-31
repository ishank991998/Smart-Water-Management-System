import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  
  

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('register',user,{headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    console.log('in Authentication');
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //console.log(headers);
    //console.log(this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers}))
    return this.http.post('authenticate',user,{headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('profile',{headers: headers})
    .map(res => res.json());
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getUsername(){
    //console.log(localStorage.getItem('user')['username']);
    return JSON.parse(localStorage.getItem('user')).username;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeWaterData(data){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(data);
    return this.http.post('dashboard',data,{headers: headers})
    .map(res => res.json());
  }
}

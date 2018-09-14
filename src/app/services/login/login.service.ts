import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginURL: string = "https://dsd-api.herokuapp.com/api/user/login";
  private registerURL: string = "https://dsd-api.herokuapp.com/api/user/register";

  constructor(private http: HttpClient) { }

  auth(formData): Observable<Object> {
    let body = {
      email: formData.email,
      password: formData.password
    };
    return this.http.post(this.loginURL, body);
  }

  register(formData:any){
    let rawDate = new Date(formData.dateOfBirth);
    console.log(rawDate);
    let dob = rawDate.getFullYear()+"-"+rawDate.getMonth()+"-"+rawDate.getDate();
    console.log(dob);
    
    let body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2,
      dateOfBirth: formData.dateOfBirth
    };
    return this.http.post(this.registerURL, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) { }

    register(user:User){
        console.log(user)
        return this.http.post<User>("/user", user);
    }

}

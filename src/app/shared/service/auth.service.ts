import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basApi = 'http://localhost:3000/admin'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.basApi)  
  }

  //get record by single id 
  getById(id: any) {
    return this.http.get(this.basApi + '/' + id)
  }

  //register user by post method
  registerData(inputdata: any) {
    return this.http.post(this.basApi, inputdata)
  }

  //update user by put method
  updateData(id: any, inputdata: any) {
    return this.http.put(this.basApi + '/' + id, inputdata)
  }

  //Get Admin
  isLoggedIn() {
    return sessionStorage.getItem('username')!=null;
  }
}

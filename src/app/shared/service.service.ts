import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  getById(code: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }


  //fetch Data
  getAllUsers(): Observable<any> {
    return this.http.get("http://localhost:3000/users");
    // return this.http.get("https://dsboxapi.beatsacademy.in/api/UserDetails/");

  }

  getSubscription(): Observable<any> {
    return this.http.get("http://localhost:3000/subscriptionData");
  }

  getAllBusiuness(): Observable<any> {
    return this.http.get("http://localhost:3000/business");
  }

  getAppConfig(): Observable<any> {
    return this.http.get("http://localhost:3000/appConfig");
  }

  getUserSubscription(): Observable<any> {
    return this.http.get("http://localhost:3000/business");
  }

  getChartInfo(){
    return this.http.get("http://localhost:3000/joiningsData");
  }

  //Update Data
  updateUsers(id: number, data: any): Observable<any> {
    return this.http.get("http://localhost:3000/users/$(id), user");
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User, Business, appConfig, Subscription } from '../models';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  getById(code: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }


  //fetch Data
  // getAllUsers(): Observable<any> {
  //   return this.http.get("http://localhost:3000/users");
  //   return this.http.get("https://dsboxapi.beatsacademy.in/api/UserDetails/");
  // }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    // return this.http.get<User[]>("http://localhost:3000/users");
    return this.http.get<any>("/api/UserDetails/");
  }


  getSubscription(): Observable<any> {
    return this.http.get<any>("api/SubscriptionsDetails/");
    // return this.http.get("http://localhost:3000/subscriptionData");
  }

  getAllBusiuness(): Observable<any> {
    return this.http.get<any>("api/BusinessDetails/");
    // return this.http.get("http://localhost:3000/business");
  }
  getBusinessId(id: number): Observable<any> {
    return this.http.get<any>("/api/BusinessDetails/${id}/");
  }
  updateBusiness(businessData: Business, id: number) {
    return this.http.put<any>("/api/BusinessDetails/${id}/", businessData);
    // return this.http.put(/api/UserDetails/${id}, businessData);
  }


  getAppConfig(): Observable<any> {
    return this.http.get<any>("api/AppConfig/");
    // return this.http.get("http://localhost:3000/appConfig");
  }

  //Display multiusers by business id 
  private selectedBusinessIdSource = new BehaviorSubject<string | null>(null);
  selectedBusinessId$ = this.selectedBusinessIdSource.asObservable();

  setSelectedBusinessId(businessId: string | null) {
    this.selectedBusinessIdSource.next(businessId);
  }

  getAllCountBusiness(): Observable<any> {
    return this.http.get<any>("api/AdminHome/");
  }

  getChartInfo(): Observable<any> {
    return this.http.get<any>("api/AdminHome/");
  }

  //Update Data
  updateUsers(id: number, data: any): Observable<any> {
    return this.http.get("http://localhost:3000/users/$(id), user");
  }

}

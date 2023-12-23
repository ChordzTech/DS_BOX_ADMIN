import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User, Business, appConfig, Subscription } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    // return this.http.get<User[]>("http://localhost:3000/users");
    return this.http.get<User[]>(`/api/UserDetails/`);
  }
  getUserId(id: number): Observable<any> {
    // return this.http.get<User>(`http://localhost:3000/users/${id}`);
    return this.http.get<User>(`/api/UserDetails/${id}/`);
  }
  updateUser(userData: User, id: number) {
    // return this.http.put<User>(`http://localhost:3000/users/${id}`, userData);
    return this.http.put<User>(`/api/UserDetails/${id}/`, userData);
  }

  //BusinessDetails API
  getAllBusinessDetails(): Observable<any> {
    // return this.http.get<Business[]>("http://localhost:3000/business");
    return this.http.get<Business[]>(`/api/BusinessDetails/`);
  }
  getBusinessId(id: number): Observable<any> {
    return this.http.get<Business>(`/api/BusinessDetails/${id}/`);
  }
  updateBusiness(businessData: Business, id: number) {
    return this.http.put<Business>(`/api/BusinessDetails/${id}/`, businessData);
    // return this.http.put(`/api/UserDetails/${id}`, businessData);
  }

  //SubscriptionDetails API
  getAllSubscriptionDetails(): Observable<any> {
    return this.http.get<Subscription[]>(`/api/SubscriptionsDetails/`);
    // return this.http.get("https://dsboxapi.beatsacademy.in/api/SubscriptionsDetails/");
  }
  getSubscriptionId(id: number): Observable<any> {
    return this.http.get<Subscription>(`/api/SubscriptionsDetails/${id}/`);
  }
  updateSubscription(subscriptionData: Subscription, id: number) {
    return this.http.put<Subscription>(`/api/SubscriptionsDetails/${id}/`, subscriptionData);
    // return this.http.put(`/api/UserDetails/${id}`, businessData);
  }

  //appConfiguration API
  getAllAppConfig(): Observable<any> {
    return this.http.get<appConfig[]>(`/api/AppConfig/`);
  }
  getappConfigId(id: number): Observable<any> {
    return this.http.get<appConfig>(`/api/AppConfig/${id}/`);
  }
  updateappConfig(appConfigData: appConfig, id: number, base64Code: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const updatedData = { ...appConfigData, configvalue: base64Code !== undefined ? base64Code : appConfigData.configvalue };
    return this.http.put<appConfig>(`/api/AppConfig/${id}/`, updatedData, { headers });
  }

  //Display multiusers by business id 
  private selectedBusinessIdSource = new BehaviorSubject<string | null>(null);
  selectedBusinessId$ = this.selectedBusinessIdSource.asObservable();

  setSelectedBusinessId(businessId: string | null) {
    this.selectedBusinessIdSource.next(businessId);
  }


  changePassword(newPassword: string): Observable<any> {
    // const userId = 'get-user-id-from-authentication'; // Replace with your logic to get the user ID
    const changePasswordUrl = `/api/Administrators/`;

    // Assuming your API endpoint for changing password is something like '/users/:id/changepassword'
    // You need to adapt this based on your API design

    return this.http.post(changePasswordUrl, { newPassword });
  }
}

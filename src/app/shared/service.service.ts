import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User, Business, appConfig, Subscription, changePassword } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //BusinessDetails API
  getAllBusinessDetails(): Observable<any> {
    return this.http.get<Business[]>(`/api/BusinessDetails/`);
  }
  getBusinessId(id: number): Observable<any> {
    return this.http.get<Business>(`/api/BusinessDetails/${id}/`);
  }
  updateBusiness(businessData: Business, id: number) {
    return this.http.put<Business>(`/api/BusinessDetails/${id}/`, businessData);
  }

  //Display multiusers by business id 
  private selectedBusinessIdSource = new BehaviorSubject<string | null>(null);
  selectedBusinessId$ = this.selectedBusinessIdSource.asObservable();

  setSelectedBusinessId(businessId: string | null) {
    this.selectedBusinessIdSource.next(businessId);
  }

  //UserDetails API
  getAllUserDetails(): Observable<any> {
    return this.http.get<User[]>(`/api/UserDetails/`);
  }
  getUserId(id: number): Observable<any> {
    return this.http.get<User>(`/api/UserDetails/${id}/`);
  }
  updateUser(userData: User, id: number) {
    return this.http.put<User>(`/api/UserDetails/${id}/`, userData);
  }

  //SubscriptionDetails API
  getAllSubscriptionDetails(): Observable<any> {
    return this.http.get<Subscription[]>(`/api/SubscriptionsDetails/`);
  }
  getSubscriptionId(id: number): Observable<any> {
    return this.http.get<Subscription>(`/api/SubscriptionsDetails/${id}/`);
  }
  updateSubscription(subscriptionData: Subscription, id: number) {
    return this.http.put<Subscription>(`/api/SubscriptionsDetails/${id}/`, subscriptionData);
  }

  //appConfiguration API
  getAllAppConfig(): Observable<any> {
    return this.http.get<appConfig[]>(`/api/AppConfig/`);
  }
  getappConfigId(id: number): Observable<any> {
    return this.http.get<appConfig>(`/api/AppConfig/${id}/`);
  }
  updateappConfig(appConfigData: appConfig, id: number): Observable<any> {              //base64Code: string
    // //const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    // const updatedData = { ...appConfigData, configvalue: base64Code !== undefined ? base64Code : appConfigData.configvalue };
    return this.http.put<appConfig>(`/api/AppConfig/${id}/`, appConfigData);         //{ headers }
  }

  updateAdminPassword(adminData: changePassword, id: number) {
    return this.http.put<changePassword>(`/api/Administrators/${id}/`, adminData);
  }
  getAdminId(id: number): Observable<any> {
    return this.http.get<changePassword>(`/api/Administrators/${id}/`);
  }

  postImage(imageData: any): Observable<any> {
    return this.http.post(`/api/UploadCode/`, { base64_code: imageData });
  }

}

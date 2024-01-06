import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatePipe } from '@angular/common';
import { User, Business, appConfig, Subscription, changePassword, TransactionDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  //Home Page
  getAllCountBusiness(): Observable<any> {
    return this.http.get<any>("/api/AdminHome/");
  }
  getChartInfo(): Observable<any> {
    return this.http.get<any>("/api/AdminHome/");
  }

  //Businesses Page
  getAllBusinessDetails(): Observable<any> {
    return this.http.get<any>(`/api/AdminHome2/`);
  }
  getBusinessId(id: number): Observable<any> {
    return this.http.get<any>(`/api/BusinessDetails/${id}/`);
  }
  updateBusiness(businessData: Business, id: number) {
    return this.http.put<any>(`/api/BusinessDetails/${id}/`, businessData);
  }
  SubcriptionEndingSoon(): Observable<any> {
    return this.http.get<any>(`/api/SubcriptionEndingSoon/`);
  }

  //Display multiusers by business id 
  private selectedBusinessIdSource = new BehaviorSubject<string | null>(null);
  selectedBusinessId$ = this.selectedBusinessIdSource.asObservable();

  setSelectedBusinessId(businessId: string | null) {
    this.selectedBusinessIdSource.next(businessId);
  }

  // post data to transactionDetails API  
  postTransaction(businessId: number, amount: number, status: string): Observable<TransactionDetails> {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') ?? '';

    // Extract the numeric value from the amount
    const numericValue = this.extractNumericValue(amount.toString());

    // Determine the duration based on the selected amount
    let duration = 0;
    if (numericValue === 149) {
      duration = 30;
    } else if (numericValue === 999 || numericValue === 1799) {
      duration = 365;
    }

    const postData: TransactionDetails = {
      businessid: businessId,
      transactiondate: formattedDate,
      amount: amount,
      status: status,
      transactionid: 0,
      duration: duration,
      perticulars: '',
    };

    return this.http.post<TransactionDetails>(`/api/TransactionDetails/`, postData as TransactionDetails);
  }

  // Function to extract the numeric value from the amount string
  extractNumericValue(amount: string): number {
    const numericValue = parseInt(amount.match(/\d+/)?.[0] || '0', 10);
    return isNaN(numericValue) ? 0 : numericValue;
  }

  //Users Page
  getAllUserDetails(): Observable<any> {
    return this.http.get<User[]>(`/api/UserDetails/`);
  }
  getUserId(id: number): Observable<any> {
    return this.http.get<User>(`/api/UserDetails/${id}/`);
  }
  updateUser(userData: User, id: number) {
    return this.http.put<User>(`/api/UserDetails/${id}/`, userData);
  }

  //Subscriptions Page
  getAllSubscriptionDetails(): Observable<any> {
    return this.http.get<Subscription[]>(`/api/SubscriptionsDetails/`);
  }
  getSubscriptionId(id: number): Observable<any> {
    return this.http.get<Subscription>(`/api/SubscriptionsDetails/${id}/`);
  }
  updateSubscription(subscriptionData: Subscription, id: number) {
    return this.http.put<Subscription>(`/api/SubscriptionsDetails/${id}/`, subscriptionData);
  }

  // Change Password Page
  updateAdminPassword(adminData: changePassword, id: number) {
    return this.http.put<changePassword>(`/api/Administrators/${id}/`, adminData);
  }
  getAdminId(id: number): Observable<any> {
    return this.http.get<changePassword>(`/api/Administrators/${id}/`);
  }

  //App Configuration Page
  getAllAppConfig(): Observable<any> {
    return this.http.get<appConfig[]>(`/api/AppConfig/`);
  }
  getappConfigId(id: number): Observable<any> {
    return this.http.get<appConfig>(`/api/AppConfig/${id}/`);
  }
  updateappConfig(appConfigData: appConfig, id: number): Observable<any> {
    return this.http.put<appConfig>(`/api/AppConfig/${id}/`, appConfigData);
  }
  postImage(imageData: any): Observable<any> {
    return this.http.post(`/api/UploadCode/`, { base64_code: imageData });
  } 
}

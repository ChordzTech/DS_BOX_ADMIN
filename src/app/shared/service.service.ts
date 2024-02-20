import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DatePipe } from '@angular/common';
import { environment } from 'environment';
import { User, Business, appConfig, Subscription, changePassword, TransactionDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  //Home Page
  getAllCountBusiness(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/AdminHome/`);
  }
  getChartInfo(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/AdminHome/`);
  }

  //Businesses Page
  getAllBusinessDetails(page: number): Observable<any> {
    const startIndex = (page - 1) * 50;
    return this.http.get<any>(`${this.url}/api/AdminHome2/?start_index=${startIndex}&limit=50`);
  }
  getBusinessId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/BusinessDetails/${id}/`);
  }
  getSubscriptionEndDate(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/SubscriptionforBusiness/${id}`);
  }
  updateBusiness(businessData: Business, id: number) {
    return this.http.put<any>(`${this.url}/api/BusinessDetails/${id}/`, businessData);
  }
  SubcriptionEndingSoon(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/SubcriptionEndingSoon/`);
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

    return this.http.post<TransactionDetails>(`${this.url}/api/TransactionDetails/`, postData as TransactionDetails);
  }

  // Function to extract the numeric value from the amount string
  extractNumericValue(amount: string): number {
    const numericValue = parseInt(amount.match(/\d+/)?.[0] || '0', 10);
    return isNaN(numericValue) ? 0 : numericValue;
  }

  //Users Page
  getAllUserDetails(page: number): Observable<any> {
    const startIndex = (page - 1) * 50;
    return this.http.get<User[]>(`${this.url}/api/UserDetails/?start_index=${startIndex}&limit=50`);
  }
  getUserId(id: number): Observable<any> {
    return this.http.get<User>(`${this.url}/api/UserDetails/${id}/`);
  }
  updateUser(userData: User, id: number) {
    return this.http.put<User>(`${this.url}/api/UserDetails/${id}/`, userData);
  }

  //Subscriptions Page
  getAllSubscriptionDetails(): Observable<any> {
    return this.http.get<Subscription[]>(`${this.url}/api/SubscriptionsDetails/`);
  }
  getSubscriptionId(id: number): Observable<any> {
    return this.http.get<Subscription>(`${this.url}/api/SubscriptionsDetails/${id}/`);
  }
  updateSubscription(subscriptionData: Subscription, id: number) {
    return this.http.put<Subscription>(`${this.url}/api/SubscriptionsDetails/${id}/`, subscriptionData);
  }

  // Change Password Page
  updateAdminPassword(adminData: changePassword, id: number) {
    return this.http.put<changePassword>(`${this.url}/api/Administrators/${id}/`, adminData);
  }
  getAdminId(id: number): Observable<any> {
    return this.http.get<changePassword>(`${this.url}/api/Administrators/${id}/`);
  }

  //App Configuration Page
  getAllAppConfig(): Observable<any> {
    return this.http.get<appConfig[]>(`${this.url}/api/AppConfig/`);
  }
  getappConfigId(id: number): Observable<any> {
    return this.http.get<appConfig>(`${this.url}/api/AppConfig/${id}/`);
  }
  updateappConfig(appConfigData: appConfig, id: number): Observable<any> {
    return this.http.put<appConfig>(`${this.url}/api/AppConfig/${id}/`, appConfigData);
  }
  postImage(imageData: any): Observable<any> {
    return this.http.post(`${this.url}/api/UploadCode/`, { base64_code: imageData });
  }

  //Business and users search operation
  businessSearch(searchTerm: string): Observable<any[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return new Observable<any[]>(observer => {
        observer.next([]); // Return an empty array if search term is empty
        observer.complete();
      });
    }

    const searchType = this.businessSearchType(searchTerm);

    return this.http.get<any[]>(`${this.url}/api/BusinessSearch/search/?search_term=${searchTerm}&search_type=${searchType}`);
  }

  private businessSearchType(value: string): string {
    // Check if the value contains only digits
    if (/^\d+$/.test(value)) {
      return 'mobile';
    }
    return 'name';
  }

  userSearch(searchTerm: string): Observable<any[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return new Observable<any[]>(observer => {
        observer.next([]); // Return an empty array if search term is empty
        observer.complete();
      });
    }

    const searchType = this.userSearchType(searchTerm);

    return this.http.get<any[]>(`${this.url}/api/UserSearch/search/?search_term=${searchTerm}&search_type=${searchType}`);
  }

  private userSearchType(value: string): string {
    // Check if the value contains only digits
    if (/^\d+$/.test(value)) {
      return 'mobile';
    }
    return 'name';
  }
}

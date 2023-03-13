/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Notifications } from '../model/notification.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }
  

  getCustomerDashboard(params: any): Observable<ApiResponse<{approved: any; processed: any; totalApproved: number; totalProcessed: number}>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.dashboard.getCustomerDashboard,
        {params}
      )
      .pipe(
        tap((_) => this.log('dashboard')),
        catchError(this.handleError('dashboard', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
     this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
     return of(error.error as T);
   };
 }

 log(message: string) {
   console.log(message);
 }

}

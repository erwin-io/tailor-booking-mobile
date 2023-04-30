import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { OrderItem } from '../model/reservation.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getByRervationId(reservationId: string): Observable<ApiResponse<OrderItem[]>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.orderItem.getByReservationId +
        reservationId
      )
      .pipe(
        tap((_) => this.log('order item')),
        catchError(this.handleError('order item', []))
      );
  }

  create(data: any): Observable<ApiResponse<OrderItem>> {
    return this.http
      .post<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.create,
        data
      )
      .pipe(
        tap((_) => this.log('order item')),
        catchError(this.handleError('order item', []))
      );
  }

  update(data: any): Observable<ApiResponse<OrderItem>> {
    return this.http
      .put<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.update,
        data
      )
      .pipe(
        tap((_) => this.log('order item')),
        catchError(this.handleError('order item', []))
      );
  }

  getById(orderItemId: string): Observable<ApiResponse<OrderItem>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.getById +
          orderItemId
      )
      .pipe(
        tap((_) => this.log('order item')),
        catchError(this.handleError('order item', []))
      );
  }

  delete(orderItemId: string): Observable<ApiResponse<OrderItem>> {
    return this.http
      .delete<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.delete + orderItemId
      )
      .pipe(
        tap((_) => this.log('rder it')),
        catchError(this.handleError('rder it', []))
      );
  }

  addAttachmentFile(data: any): Observable<ApiResponse<any>> {
    return this.http
      .post<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.addAttachmentFile,
        data
      )
      .pipe(
        tap((_) => this.log('order item')),
        catchError(this.handleError('order item', []))
      );
  }

  removeAttachmentFile(orderItemAttachmentId: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.orderItem.removeAttachmentFile + orderItemAttachmentId
      )
      .pipe(
        tap((_) => this.log('rder it')),
        catchError(this.handleError('rder it', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(
        `${operation} failed: ${
          Array.isArray(error.error.message)
            ? error.error.message[0]
            : error.error.message
        }`
      );
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}

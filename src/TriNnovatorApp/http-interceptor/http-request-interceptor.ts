import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { SpinnerService } from '../spinner/spinner.service';
import { tap } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinnerService : SpinnerService){}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Prasad Auth Intercept Provider');
  
    this.spinnerService.requestStarted();
    return this.handler(next,request);

  }


  handler(next: HttpHandler, request: HttpRequest<any>){
    return next.handle(request)
      .pipe(
          tap({
              next: (event) =>{
                if(event instanceof HttpResponse){
                  this.spinnerService.requestEnded();
                }
              },
              error: (error: HttpErrorResponse) =>{
                  this.spinnerService.resetSpinner();
                  throw error;
              }
          })
      );
  }
}
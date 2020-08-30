import * as alertify from 'alertifyjs';
import { Injectable } from '@angular/core';
// import _ from 'alertify';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}
  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}

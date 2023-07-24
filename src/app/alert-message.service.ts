import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertMessageService implements IAlertMessage {

  constructor() { }

  successNotification(message: string) {
    Swal.fire('', message, 'success');
  }
  errorNotification(message: string) {
    Swal.fire('', message, 'error');
  }
  infoNotification(message: string) {
    Swal.fire('', message, 'info');
  }
}

export interface IAlertMessage {
  successNotification: (message: string) => void;
  errorNotification: (message: string) => void;
  infoNotification: (message: string) => void;
}

import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertSuccess = (title:string, description:string) => Swal.fire(title, description, 'success')

  alertError = (title:string, description:string) => Swal.fire(title, description, 'error')

  alertInfo = (title:string, description:string) => Swal.fire(title, description, 'info')

  showLoading = (title) => Swal.fire({title, onBeforeOpen:() => Swal.showLoading(), allowOutsideClick: false})
  
  closeAlert = () => Swal.close()
}

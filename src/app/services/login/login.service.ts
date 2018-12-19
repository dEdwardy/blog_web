import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService:BaseServicesService) { }
  public login(params:any){
    return this.baseService.query('post','http://172.16.4.78:3000/api/users/checkUser',params)
  }
}

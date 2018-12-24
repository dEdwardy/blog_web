import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
import { baseUrl } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService:BaseServicesService) { }
  public login(params:any){
    return this.baseService.query('post',baseUrl+'/users/checkUser',params,{}).then(res =>res);;
  }
  public reg(params:any){
    return this.baseService.query('post',baseUrl+'/users/addUser',params).then(res =>res);;
  }
  public uniqueUsername(params:any){
    return this.baseService.query('post',baseUrl+'/users/checkUsername',params).then(res =>res);;
  }
  public uniqueEmail(params:any){
    return this.baseService.query('post',baseUrl+'/users/checkEmail',params).then(res =>res);;
  }
}

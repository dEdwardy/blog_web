import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
import { baseUrl } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService:BaseServicesService) { }
  public login(params:any){
    return this.baseService.query('post',baseUrl+'/users/checkUser',params,{}).toPromise();
  }
  public reg(params:any){
    return this.baseService.query('psot',baseUrl+'/users/addUser',params).toPromise();
  }
  public uniqueUsername(params:any){
    return this.baseService.query('psot',baseUrl+'/users/checkUsername',params).toPromise();
  }
}

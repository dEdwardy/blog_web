import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseServicesService {

  constructor(private http:HttpClient) { }
  public query(method:string,url:string,params:any){
    switch(method){
      case 'get':{
        return this.http.get(url)
      }
      case 'post':{
        let headers =new HttpHeaders({'conent-Type':'application/x-www-form-urlencode;charset=utf-8'});
        return this.http.post(url,params,{ headers });
      }
      default:{
        
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseServicesService {

  constructor(private http:HttpClient) { }
  public query(method:string,url:string,params:any={},header:any={}){
    switch(method){
      case 'get':{
        return this.http.get(url, {params} ).toPromise();
      }
      case 'getJsonp':{
        return this.http.jsonp(url,params).toPromise();
      }
      case 'post':{
        return this.http.post(url,params).toPromise();;
      }
      case 'delete':{
        return this.http.delete(url,params).toPromise();
      }
      case 'put':{
        return this.http.put(url,params).toPromise();
      }
      default:{
        
      }
    }
  }
}

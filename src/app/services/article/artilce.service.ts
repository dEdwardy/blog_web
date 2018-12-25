import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
import { baseUrl } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class ArtilceService {

  constructor(private baseService:BaseServicesService) { }
  public writeArtilce(params,headers:any={}){
    return this.baseService.query('post',baseUrl+'/articles/addArticle',params,headers).then(res =>res);;
  }
  public getArticle(params={}){
    return this.baseService.query('get',baseUrl+'/articles/getArticles', params).then(res => res);;
  }
  public deleteArticle(params){
    return this.baseService.query('delete',baseUrl+'/articles/deleteArticle',params).then(res =>res);
  }
}

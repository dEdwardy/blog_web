import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
import { baseUrl } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class ArtilceService {

  constructor(private baseService:BaseServicesService) { }
  public writeArtilce(params,headers:any={}){
    return this.baseService.query('post',baseUrl+'/articles/addArticle',params,headers);
  }
  public getArticle(params={}){
    return this.baseService.query('get',baseUrl+'/articles/getArticles', params );
  }
  public deleteArticle(params){
    return this.baseService.query('delete',baseUrl+'/articles/deleteArticle',params)
  }
}

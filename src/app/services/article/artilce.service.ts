import { Injectable } from '@angular/core';
import { BaseServicesService } from '../base-services.service'
import { baseUrl } from '../../config'
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArtilceService {

  constructor(private baseService:BaseServicesService) { }
  public writeArtilce(params,headers:{}){
    return this.baseService.query('post',baseUrl+'/articles/addArticle',params,{});
  }
  public getArticle(params:{}={}){
    return this.baseService.query('get',baseUrl+'/articles/getArticles',params);
  }
}

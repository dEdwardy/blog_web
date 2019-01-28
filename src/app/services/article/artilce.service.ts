import { Injectable } from "@angular/core";
import { BaseServicesService } from "../base-services.service";
import { baseUrl } from "../../config";
@Injectable({
  providedIn: "root"
})
export class ArtilceService {
  constructor(private baseService: BaseServicesService) {}
  public writeArtilce(params, headers: any = {}) {
    return this.baseService
      .query("post", baseUrl + "/articles/addArticle", params, headers)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public getArticle(params = {}) {
    return this.baseService
      .query("get", baseUrl + "/articles/getArticles", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public deleteArticle(params) {
    return this.baseService
      .query("delete", baseUrl + "/articles/deleteArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public likeArticle(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/likeArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public dislikeArticle(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/dislikeArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public addComment(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/addComment",params)
      .then(res => res)
      .catch(e => console.log(e));
  }
}

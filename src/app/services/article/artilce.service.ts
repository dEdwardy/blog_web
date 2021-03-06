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
  public updateArtilce(params, headers: any = {}) {
    return this.baseService
      .query("put", baseUrl + "/articles/updateArticle", params, headers)
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
  public cancelLikeArticle(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/cancelLikeArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public dislikeArticle(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/dislikeArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public cancelDislikeArticle(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/cancelDislikeArticle", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public addComment(params) {
    return this.baseService
      .query("post", baseUrl + "/articles/addComment",params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public deleteComment(params) {
    return this.baseService
      .query("delete", baseUrl + "/articles/deleteComment",params)
      .then(res => res)
      .catch(e => console.log(e));
  }
}

import { Injectable } from "@angular/core";
import { BaseServicesService } from "../base-services.service";
import { baseUrl } from "../../config";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private baseService: BaseServicesService) {}
  public login(params: any) {
    return this.baseService
      .query("post", baseUrl + "/users/checkUser", params, {})
      .then(res => res)
      .catch(e => console.log(e));
  }
  public reg(params: any) {
    return this.baseService
      .query("post", baseUrl + "/users/addUser", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public uniqueUsername(params: any) {
    return this.baseService
      .query("post", baseUrl + "/users/checkUsername", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public uniqueEmail(params: any) {
    return this.baseService
      .query("post", baseUrl + "/users/checkEmail", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public getUser(params = {}) {
    return this.baseService
      .query("get", baseUrl + "/users/allUsers", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
  public updateUser(params = {}) {
    return this.baseService
      .query("put", baseUrl + "/users/updateUser", params)
      .then(res => res)
      .catch(e => console.log(e));
  }
}

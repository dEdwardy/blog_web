import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Utils } from '../../common/helper/utils-helper'
import { LoginService } from '../../services/login/login.service'

@Injectable()
export class CanAuthProvide implements CanActivate {
  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }
  authority:any;
  authorityRes:any;
  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    return this.can();
  }
  async checkAuthority() {
    let userinfo = Utils.getCookie("userinfo");
    if (!userinfo) {
      this.authority = 0;
      return;
    }
    let email = JSON.parse(userinfo).email;
    console.log(JSON.parse(userinfo));
    console.log(email);
    try {
      this.authorityRes = await this.loginService.uniqueEmail({ email });
      this.authority = this.authorityRes.authority;
    } catch (error) {
      console.log(error);
    }
  }
  async can() {
    let token = Utils.getCookie('userinfo')
    if(token){
      console.log('已登录')
      await this.checkAuthority();
      if(this.authority===1){
        console.log('admin')
        return true;
      }else{
        this.router.navigate(['./index']);
        console.log('非admin')
        return false;
      }
    }
    else{
      this.router.navigate(['./index']);
      console.log('请先登录')
      return false;
    }
  }



}

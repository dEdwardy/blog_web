import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Utils } from '../../common/helper/utils-helper'


@Injectable()
export class CanAuthProvide implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    return this.can();
  }

  can() {
    let token = Utils.getCookie('userinfo')
    if(token){
      console.log('已登录')
      return true;
    }
    else{
      this.router.navigate(['./index']);
      console.log('请先登录')
      return false;
    }
  }



}

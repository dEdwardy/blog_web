import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


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
    let token = localStorage.getItem('token')
    if(token){
      console.log('Token 通过')
      return true;
    }
    else{
      console.log('401')
      this.router.navigate(['./index']);
      return false;
    }
  }



}

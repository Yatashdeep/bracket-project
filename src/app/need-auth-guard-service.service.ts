import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import{UserserviceServiceService}from'./userservice-service.service'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeedAuthGuardServiceService implements CanActivate {

  constructor(public router:Router,public userservice:UserserviceServiceService) { 
    alert('hi')
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      alert('canactivate')
    const redirectUrl = route['_routerState']['url'];
       alert(this.userservice.isLogged())
    if (this.userservice.isLogged()) {
      
      return true;
    }

    // this.router.navigateByUrl(
    //   this.router.createUrlTree(
    //     ['/Home'], {
    //       queryParams: {
    //         redirectUrl
    //       }
    //     }
    //   )
    // );
    this.router.navigate(['/Home'], { queryParams: { returnUrl: state.url }});

    return false;
  }
}
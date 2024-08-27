import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanDeactivateFn, CanMatchFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthComponent } from "../../auth/auth.component";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

export const authGuard: CanActivateFn = (route, segments) => {
    console.log('1');
    return isValidUrls()    
};




// export const prevntNavigation: CanActivateFn = (route, state) => {
//     let router = inject(Router)
//     const currentUrl = router.url; 
//     const desiredUrl = state.url;
//     if (isValidUrls()) {
//       router.navigateByUrl(currentUrl);
//       return false;
//     }
//     history.pushState('', '', desiredUrl);
//     return true;
// }

function isValidUrls(): boolean {
    console.log('canDeactivates');
    let res: boolean | null = JSON.parse(localStorage.getItem('signIn')!)
    if(res != null){
        return true;
    }
    return false;
}

export const inverseAuthGuard: CanMatchFn = (route, segments) => {
    console.log('2');
    return !isValidUrls()
};

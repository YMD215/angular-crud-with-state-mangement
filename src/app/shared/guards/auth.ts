import { inject } from "@angular/core";
import { CanMatchFn, Route, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

export const authGuard: CanMatchFn = (route, segments) => {
    let res: boolean | null = JSON.parse(localStorage.getItem('signIn')!)
    if(res == null){
        return false;
    }
    return true;
};

export const inverseAuthGuard: CanMatchFn = (route, segments) => {
    let res: boolean | null = JSON.parse(localStorage.getItem('signIn')!)
    if(res == null){
        return true;
    }
    return false;
};
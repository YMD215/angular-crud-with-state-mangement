import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdminComponent } from './auth/admin/admin.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { authGuard, inverseAuthGuard } from './shared/guards/auth';

export const routes: Routes = [
    {
        path: '' , 
        redirectTo: 'Auth', 
        pathMatch: 'full',
    },
    {
        path: 'Auth', 
        canMatch: [inverseAuthGuard],
        loadComponent:() => import('./auth/auth.component').
        then(m => m.AuthComponent),
        children: [
            {
                path: '',
                redirectTo: 'signIn', 
                pathMatch: 'full',
                
            },
            {path: 'signIn' ,  component: SignInComponent},
            {path: 'signUp' ,  component: SignUpComponent},
            {path: 'admin' , component: AdminComponent}
        ]
    },
    {path: 'signOut' ,  component: SignOutComponent},
    {
        path: "users" ,
        canMatch: [authGuard],
        loadComponent: () => import("./users/users.component")
        .then((m) => m.UsersComponent),
        children: [
            {
                path: "" , 
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {path: "list" , component: UserListComponent},
            {path: "id" , component: UserDetailComponent},
        ]
    },
    {path: '**' , redirectTo: 'Auth/signIn'}
];

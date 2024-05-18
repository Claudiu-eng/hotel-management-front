import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInRegisterComponent} from "./components/log-in-register/log-in-register.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {MainPageComponent} from "./components/main-page/main-page.component";

const routes: Routes = [
  // { path: 'admin', component: AdminPageComponent ,canActivate: [AdminAuthGuard]},
  { path: 'login', component: LogInRegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'main', component: MainPageComponent },
  // { path: 'user', component: UserPageComponent ,canActivate: [UserAuthGuard]},
  // { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/login' ,pathMatch: 'full'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

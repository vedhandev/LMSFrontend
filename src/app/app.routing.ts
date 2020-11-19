import { FormsModule } from '@angular/forms';
import { LoginComponent } from "../app/pages/login/login.component";
import { Full_ROUTES } from "../app/layout/routes/main-layout.routes";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { OnlyLoggedInUsersGuard } from './shared/services/OnlyLoggedInUsersGuard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: Full_ROUTES,
    canActivate: [OnlyLoggedInUsersGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

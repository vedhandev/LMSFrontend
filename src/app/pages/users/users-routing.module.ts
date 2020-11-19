
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddusersComponent } from './addusers/addusers.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
      {
      path: 'userHome',
      component: UsersComponent,
      data: {
        title: 'User Home Page '
      }
   

    },
      {
        path: 'addUser/:operation',
        component: AddusersComponent,
        data: {
          title: 'Add User  Page'
        }
    }
       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class UsersRoutingModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserModel } from 'app/shared/models/userModel';
import { AuthServiceProvider } from 'app/shared/services/authentication-service';
import { UsersListServiceProvider } from 'app/shared/services/user-service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DatatableComponent)
  table: DatatableComponent;
  operation: string;
  deletePermission: boolean;

  deleteRowId: string;
  reason: string;
  temp: any = [];
  rows: any = [];
  user: UserModel;
  searchValue: any = '';

  
 
  config = {
    // modal configuration- doesnt allow esc key to close the window.
    animated: true,
    backdrop: 'static',
    keyboard: false,
    ignoreBackdropClick: true
  };
 
  modalRef: BsModalRef;

  constructor(
    public authService: AuthServiceProvider,
    private router: Router,
    public modalService: BsModalService,
    public usersListService: UsersListServiceProvider
  ) {
    this.operation = '';
  }


  ngOnInit() {
    document.getElementById('clearbtn').style.display = 'none';
    this.deletePermission = !this.authService.hasDeletePermission();
    this.loadUsersList();
  }



  /** To load data in table */
  loadUsersList(): any {
    this.usersListService.getUsersList().subscribe(
      res => {
        this.temp = res;
        this.rows = res;
        console.log('UsersList', this.rows);
      },
      err => console.log(err)
    );
  }

  /** To Add new USer  */
  addUser() {
    this.router.navigate(['/addUser', 'addUser']);
    console.log(this.operation)
  }

  /** To view parts on clicking view icon */
  viewUser(rowdata) {
    this.operation = 'viewUser';
    this.user = rowdata;
    this.usersListService.setUserDetails(this.user);
    this.router.navigate(['/addUser', 'viewUser']);
  }

  /** To edit  on clicking edit icon */
  public editUser(row) {
    this.operation = 'editUser';
    this.user = row;
    this.usersListService.setUserDetails(this.user);
    this.router.navigate(['/addUser', 'editUser']);
  }

  /** Providing delete premission to authorised user */
  public deleteUser(template, rowdata) {
    console.log(rowdata);
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.deleteRowId = rowdata._id;
  }

  /** Filter bar */
  public updateFilter(event) {
    document.getElementById('clearbtn').style.display = 'inline';
    console.log('update');
    console.log(this.temp);
    const val = event.target.value.toLowerCase();
    if (val.length === 0) {
      document.getElementById('clearbtn').style.display = 'none';
    }

    /** filter our data  */
    const temp = this.temp.filter(function (d) {
      return (

        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.role.toLowerCase().indexOf(val) !== -1 ||
        d.mobile.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    /** Update the rows */

    this.rows = temp;
    /** Whenever the filter changes, always go back to the first page  */
    this.table.offset = 0;
  }
  clear(e) {
    // console.log("clicked", e);
    this.searchValue = null
    document.getElementById('clearbtn').style.display = 'inline';
    // console.log("update", event);
    // console.log(this.temp);
    const val = e.target.part.value.toLowerCase();
    if (val.length === 0) {
      document.getElementById('clearbtn').style.display = 'none';
    }

    /** filter our data  */
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.role.toLowerCase().indexOf(val) !== -1 ||
        d.mobile.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    /** Update the rows */
    this.rows = temp;

    /** Whenever the filter changes, always go back to the first page  */
    this.table.offset = 0;
  }
  /** Delete confirmation message */
  confirm(): void {
    this.usersListService
      .deleteUserInfo(this.deleteRowId, this.reason)
      .subscribe(
        res => {
          console.log('User deleted !!!');
          this.reason = '';
          this.loadUsersList();
        },
        err => {
          console.log(err);
        }
      );
    this.modalRef.hide();
  }
  decline(): void {
    this.reason = '';
    this.modalRef.hide();
  }
}

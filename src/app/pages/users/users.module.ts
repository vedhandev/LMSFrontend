// import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { UsersComponent } from "./users.component";

import { BsModalService, BsModalRef, ModalModule } from "ngx-bootstrap/modal";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule } from "@angular/forms";
import { AddusersComponent } from "./addusers/addusers.component";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,

    ModalModule.forRoot(),

    UsersRoutingModule,
  ],
  declarations: [UsersComponent, AddusersComponent],
  providers: [BsModalService],
})
export class UsersModule {}

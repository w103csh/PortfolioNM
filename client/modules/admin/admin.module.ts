
// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

// Modules
import { AppModule } from '../../app/app.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DialogModule } from '../dialog/dialog.module';

// Services
import { UserResolver } from '../../services/user-resolver.service';

// Components
import { AdminComponent } from './admin.component';
import { AccountComponent } from './components/account/account.component';
import { UsersComponent } from './components/users/users.component';
import { TabContentContainerComponent } from './components/tab-content-container/tab-content-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminRoutingModule,
    DialogModule,
  ],
  declarations: [
    AdminComponent,
    AccountComponent,
    UsersComponent,
    TabContentContainerComponent,
  ],
  providers: [
    UserResolver,
  ],
})
export class AdminModule { }
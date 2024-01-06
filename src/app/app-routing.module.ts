import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { MultiUsersComponent } from './admin/dashboard/user/multi-users/multi-users.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { SubscriptonComponent } from './admin/dashboard/subscripton/subscripton.component';
import { BusinessComponent } from './admin/dashboard/business/business.component';
import { EditSubscriptionFormComponent } from './edit-subscription-form/edit-subscription-form.component';
import { EditBusinessFormComponent } from './edit-business-form/edit-business-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppConfigComponent } from './app-config/app-config.component';
import { EditAppConfigComponent } from './edit-app-config/edit-app-config.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserComponent },
      { path: 'subscription', component: SubscriptonComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'appConfig', component: AppConfigComponent },
      { path: 'subscription-status', component: SubscriptionStatusComponent },
      { path: 'multiusers/:id', component: MultiUsersComponent },
      { path: 'editusers/:id', component: EdituserFormComponent },
      { path: 'editsubscription/:id', component: EditSubscriptionFormComponent },
      { path: 'editbusiness/:id', component: EditBusinessFormComponent },
      { path: 'changePassword/:id', component: ChangePasswordComponent },
      { path: 'editappConfig/:id', component: EditAppConfigComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { MultiUsersComponent } from './admin/dashboard/user/multi-users/multi-users.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { SubscriptonComponent } from './admin/dashboard/subscripton/subscripton.component';
import { BusinessComponent } from './admin/dashboard/business/business.component';
import { EditSubscriptionFormComponent } from './edit-subscription-form/edit-subscription-form.component';
import { EditBusinessFormComponent } from './edit-business-form/edit-business-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppConfigComponent } from './app-config/app-config.component';
import { EditAppConfigComponent } from './edit-app-config/edit-app-config.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'subscription', component: SubscriptonComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'multiusers/:id', component: MultiUsersComponent },
      { path: 'editusers/:id', component: EdituserFormComponent },
      { path: 'editsubscription/:id', component: EditSubscriptionFormComponent },
      { path: 'editbusiness/:id', component: EditBusinessFormComponent },
      { path: 'changePassword/:id', component: ChangePasswordComponent },
      { path: 'appConfig', component: AppConfigComponent },
      { path: 'editappConfig/:id', component: EditAppConfigComponent },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

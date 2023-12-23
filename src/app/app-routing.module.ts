import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { SettingsComponent } from './admin/dashboard/settings/settings.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { SubscriptonComponent } from './admin/dashboard/subscripton/subscripton.component';
import { BusinessComponent } from './admin/dashboard/business/business.component';
import { EditSubscriptionFormComponent } from './edit-subscription-form/edit-subscription-form.component';
import { EditBusinessFormComponent } from './edit-business-form/edit-business-form.component';
import { ChangePasswordComponent } from './admin/dashboard/change-password/change-password.component';
import { EditAppconfigFormComponent } from './edit-appconfig-form/edit-appconfig-form.component';

const routes: Routes = [
  {
    // canActivate: [AuthGuard],
    path: '',
    component: HomeComponent, 
    children: [
      { path: 'users', component: UserComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'subscription', component: SubscriptonComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'appConfig', component: SettingsComponent },
      { path: 'users/:id/edit', component: EdituserFormComponent },
      { path: 'subscription/:id/edit', component: EditSubscriptionFormComponent },
      { path: 'business/:id/edit', component: EditBusinessFormComponent },
      { path: 'appConfig/:id/edit', component: EditAppconfigFormComponent },    
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

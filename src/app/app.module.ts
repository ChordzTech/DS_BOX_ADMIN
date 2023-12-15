import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './admin/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { SettingsComponent } from './admin/dashboard/settings/settings.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NonSubsUsersComponent } from './admin/dashboard/user/non-subs-users/non-subs-users.component';
import { MultiUsersComponent } from './admin/dashboard/user/multi-users/multi-users.component';
import { SingleUsersComponent } from './admin/dashboard/user/single-users/single-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { EdituserFormComponent } from './edituser-form/edituser-form.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { BusinessComponent } from './admin/dashboard/business/business.component';
import { SubscriptonComponent } from './admin/dashboard/subscripton/subscripton.component';
import { EditSubscriptionFormComponent } from './edit-subscription-form/edit-subscription-form.component';
import { EditBusinessFormComponent } from './edit-business-form/edit-business-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,
    SettingsComponent,
    NonSubsUsersComponent,
    MultiUsersComponent,
    SingleUsersComponent,
    EdituserFormComponent,
    LoginComponent,
    RegisterComponent,
    BusinessComponent,
    SubscriptonComponent,
    EditSubscriptionFormComponent,
    EditBusinessFormComponent,
    ChangePasswordComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatSliderModule,
    // FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    NgChartsModule,
    HighchartsChartModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// --------------main component ------------------------
import { AppComponent } from './app.component';

// ------------------admin components---------------------------
import { AdminComponent } from './components/admin/admin.component';
import { ControlPanelComponent } from './components/admin/control-panel/control-panel.component';
import { PaymentMethodsComponent } from './components/admin/payment-methods/payment-methods.component';
import { PaymentAddressComponent } from './components/admin/payment-address/payment-address.component';
import { BuyOrdersComponent } from './components/admin/buy-orders/buy-orders.component';
import { SellOrdersComponent } from './components/admin/sell-orders/sell-orders.component';
import { KycComponent } from './components/admin/kyc/kyc.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';
import { CryptoDetailsComponent } from './components/admin/crypto-details/crypto-details.component';


// --------------------- admin service----------------------------
import { AdminDataService } from './services/admin-data.service';
import { AdminauthGuard } from './guards/adminauth.guard';

// -----------------------client components---------------------------
import { ClientdashComponent } from './components/client/clientdash/clientdash.component';
import { DashcontentComponent } from './components/client/dashcontent/dashcontent.component';
import { BuysellComponent } from './components/client/buysell/buysell.component';
import { SettingsComponent } from './components/client/settings/settings.component';
import { AccountconfirmationComponent } from './components/client/accountconfirmation/accountconfirmation.component';
import { FaqComponent } from './components/client/faq/faq.component';

// ----------------------shared components -----------------------
import { TermsOfServiceComponent } from './components/shared/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/shared/privacy-policy/privacy-policy.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContactUsComponent } from './components/shared/contact-us/contact-us.component';
import { ResetpasswordpageComponent } from './components/shared/resetpasswordpage/resetpasswordpage.component';
import { HomeComponent } from './components/shared/home/home.component';
import { LoginComponent } from './components/shared/login/login.component';

// -----------------------client services-------------------------
import { DataService } from './services/data.service';


// --------------------custom pipes--------------------------------
import { SearchByDatePipe } from './filters/search-by-date.pipe';
import { OrderFilterPipe } from './filters/orderBy.pipe';
import { PriceFilterPipe } from './filters/price.pipe';
import { SortPipe } from './filters/sort.pipe';

// ------------------------guards-------------------------
import { BuysellguardGuard } from './guards/buysellguard.guard';
import { AuthGuard } from './guards/auth.guard';

// ------------------third party modules -------------- 
import { RecaptchaModule } from 'ng-recaptcha';
import {NgxPaginationModule} from 'ngx-pagination';
import swal from 'sweetalert2';

// -------------routing--------------------
import { RoutingModule } from './routing/routing.module';


// ----------------interceptor----------------
import { TokenInterceptor } from './services/http.interceptor';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientdashComponent,
    LoginComponent,
    BuysellComponent,
    SettingsComponent,
    AccountconfirmationComponent,
    FaqComponent,
    DashcontentComponent,
    AdminComponent,
    ControlPanelComponent,
    PaymentMethodsComponent,
    PaymentAddressComponent,
    BuyOrdersComponent,
    SellOrdersComponent,
    KycComponent,
    OrderFilterPipe,
    PriceFilterPipe,
    SortPipe,
    AdminSettingsComponent,
    ContactUsComponent,
    ResetpasswordpageComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    HeaderComponent,
    FooterComponent,
    SearchByDatePipe,
    CryptoDetailsComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RecaptchaModule.forRoot()
    
    
    

  ],
  providers: [ AuthService, DataService, AuthGuard, AdminauthGuard, BuysellguardGuard, AdminDataService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

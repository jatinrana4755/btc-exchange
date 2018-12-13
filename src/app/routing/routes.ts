import { Routes } from '@angular/router';

// ----------------client route----------------
import { DashcontentComponent } from '../components/client/dashcontent/dashcontent.component';
import { BuysellComponent } from '../components/client/buysell/buysell.component';
import { SettingsComponent } from '../components/client/settings/settings.component';
import { ClientdashComponent } from '../components/client/clientdash/clientdash.component';
import { AccountconfirmationComponent } from '../components/client/accountconfirmation/accountconfirmation.component';
import { FaqComponent } from '../components/client/faq/faq.component';

// -----------------------admin routes-------------------------
import { AdminComponent } from '../components/admin/admin.component';
import { ControlPanelComponent } from '../components/admin/control-panel/control-panel.component';
import { PaymentMethodsComponent } from '../components/admin/payment-methods/payment-methods.component';
import { BuyOrdersComponent } from '../components/admin/buy-orders/buy-orders.component';
import { SellOrdersComponent } from '../components/admin/sell-orders/sell-orders.component';
import { PaymentAddressComponent } from '../components/admin/payment-address/payment-address.component';
import { KycComponent } from '../components/admin/kyc/kyc.component';
import { AdminSettingsComponent } from '../components/admin/admin-settings/admin-settings.component';
import { CryptoDetailsComponent } from '../components/admin/crypto-details/crypto-details.component';

// ----------------------shared components routes------------------
import { HomeComponent } from '../components/shared/home/home.component';
import { LoginComponent } from '../components/shared/login/login.component';
import {ContactUsComponent} from '../components/shared/contact-us/contact-us.component';
import {TermsOfServiceComponent} from '../components/shared/terms-of-service/terms-of-service.component';
import {PrivacyPolicyComponent} from '../components/shared/privacy-policy/privacy-policy.component';
import {ResetpasswordpageComponent} from '../components/shared/resetpasswordpage/resetpasswordpage.component';

// ---------------------------guards-----------------------
import { BuysellguardGuard } from '../guards/buysellguard.guard';
import { AdminauthGuard } from '../guards/adminauth.guard';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admindash', component: AdminComponent,canActivate:[AdminauthGuard],canActivateChild:[AdminauthGuard],
    children: [
      { path: 'controlpanel', component: ControlPanelComponent },
      { path: 'paymentmethods', component: PaymentMethodsComponent },
      { path: 'paymentaddress', component: PaymentAddressComponent },
      { path: 'buyorders', component: BuyOrdersComponent},
      { path: 'sellorders', component: SellOrdersComponent},
      { path: 'kyc', component: KycComponent },
      { path: 'adminsettings', component: AdminSettingsComponent },
      { path: 'cryptoDetails', component: CryptoDetailsComponent },
      { path: '',
        redirectTo: '/admindash/controlpanel',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'clientdash', component: ClientdashComponent,canActivate:[AuthGuard],
    children: [
      { path: 'dashcontent', component: DashcontentComponent, canActivate:[AuthGuard] },
      { path: 'buysell', component: BuysellComponent ,canActivate:[BuysellguardGuard]},
      { path: 'faq', component: FaqComponent , canActivate:[AuthGuard]},
      { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
      { path: 'accountconfirmation', component: AccountconfirmationComponent},
      { path: '',
        redirectTo: '/clientdash/dashcontent',
        pathMatch: 'full'
      },
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetpasswordpage/:email', component: ResetpasswordpageComponent },
  { path: 'termsOfService', component: TermsOfServiceComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'contact', component:ContactUsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }

  


];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfodetailsComponent } from './infodetails/infodetails.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponentComponent } from './auth/forgot-password-component/forgot-password-component.component';
import { VarifyEmailComponent } from './auth/varify-email/varify-email.component';
import { UserinfoComponent } from './infodetails/userinfo/userinfo.component';
import { FileuploadComponent } from './infodetails/fileupload/fileupload.component';
import { UserfetchComponent } from './userfetch/userfetch.component';
import { PublicGalleryComponent } from './public-gallery/public-gallery.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { ContactComponent } from './userinfo/contact/contact.component';
import { AboutComponent } from './userinfo/about/about.component';
import { EventsComponent } from './userinfo/events/events.component';
import { WorkComponent } from './userinfo/work/work.component';

const routes: Routes = [
  {
    path:'login', component:SignInComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'info', component: InfodetailsComponent
  },
    {path: 'forgot-password', component : ForgotPasswordComponentComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {
    path:'userinfo', component:UserinfoComponent
  },
  {
    path:'upfile', component: FileuploadComponent
  },
  // {
  //   path:'about', component:UserfetchComponent, canActivate: [AuthGuard]
  // },
  {
    path:'galary', component:PublicGalleryComponent
  },
  { path: 'admin/products', component: AdminProductsComponent, },
  { path: 'admin/products/add', component: AdminProductFormComponent, },
  { path: 'admin/products/edit/:id', component: AdminProductFormComponent, },
  {
    path:'contact', component:ContactComponent
  },
  {
    path:'about', component:AboutComponent
  },
  {
    path:'event', component:EventsComponent
  },
  {
    path:'work', component:WorkComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

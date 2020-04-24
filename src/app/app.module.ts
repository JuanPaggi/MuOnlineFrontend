import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RankingComponent } from './ranking/ranking.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { PersonajesComponent } from './user-menu/personajes/personajes.component';
import { UserInfoComponent } from './user-menu/user-info/user-info.component';
import { ChangeNameComponent } from './user-menu/user-info/change-name/change-name.component';
import { ChangePasswordComponent } from './user-menu/user-info/change-password/change-password.component';
import { UsersService } from './services/users/users.service';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    DownloadsComponent,
    RankingComponent,
    ShopComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UserMenuComponent,
    PersonajesComponent,
    UserInfoComponent,
    ChangeNameComponent,
    ChangePasswordComponent,
    RecuperarComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

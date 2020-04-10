import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RankingComponent } from './ranking/ranking.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { RegisterComponent } from './register/register.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { PersonajesComponent } from './user-menu/personajes/personajes.component';
import { UserInfoComponent } from './user-menu/user-info/user-info.component';
import { ChangeNameComponent } from './user-menu/user-info/change-name/change-name.component';
import { ChangeEmailComponent } from './user-menu/user-info/change-email/change-email.component';
import { ChangePasswordComponent } from './user-menu/user-info/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NewsComponent,
      },
      {
        path: 'downloads',
        component: DownloadsComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'ranking',
        component: RankingComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'user',
        component: UserMenuComponent,
        children: [
          {
            path: '',
            component: UserInfoComponent,
            children: [
              {
                path: 'editname',
                component: ChangeNameComponent,
              },
              {
                path: 'editemail',
                component: ChangeEmailComponent,
              },
              {
                path: 'changepass',
                component: ChangePasswordComponent,
              },
            ],
          },
          {
            path: 'personajes',
            component: PersonajesComponent,
          },
        ],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

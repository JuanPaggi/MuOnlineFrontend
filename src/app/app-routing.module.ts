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

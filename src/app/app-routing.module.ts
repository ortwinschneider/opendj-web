import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './provider/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AppAuthGuard] },
  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule', canActivate: [AppAuthGuard] },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule', canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AppAuthGuard],
  exports: [RouterModule]

})
export class AppRoutingModule {}

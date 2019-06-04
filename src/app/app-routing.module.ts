import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from './providers/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AppAuthGuard] },
  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule', canActivate: [AppAuthGuard] },
  { path: 'event-detail/:id', loadChildren: './pages/event-detail/event-detail.module#EventDetailPageModule', canActivate: [AppAuthGuard] },
  { path: 'event-create', loadChildren: './pages/event-create/event-create.module#EventCreatePageModule', canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AppAuthGuard],
  exports: [RouterModule]

})
export class AppRoutingModule {}

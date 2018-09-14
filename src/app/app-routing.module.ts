import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'simulator', loadChildren: './simulator/simulator.module#SimulatorPageModule', canActivate: [AuthGuard] },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './routes/login/login.component'
import { IndexComponent } from './routes/admin/index/index.component'
import { DetailsComponent } from './routes/admin/details/details.component'
import { RegComponent } from './routes/reg/reg.component'
import { NotFoundComponent } from './routes/not-found/not-found.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'index',
    // canActivate:[AuthGuard],    /*配置路由守卫*/
    // canActivateChild: [AuthGuard],
    component: IndexComponent,
    children: [
      { path: 'add', loadChildren: './routes/admin/index/first/first.module#FirstModule' },
      { path: 'get', loadChildren: './routes/admin/index/second/second.module#SecondModule' }
    ]
  },
  { path:'details', component: DetailsComponent },
  { path:'reg', component:RegComponent },
  { path:'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

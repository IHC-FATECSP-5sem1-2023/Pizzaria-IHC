import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/template/login/login.component';
import { ContentComponent } from './components/template/content/content.component';
import { HomeComponent } from './components/template/home/home.component';
import { PedidoComponent } from './components/template/pedido/pedido.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: ContentComponent, outlet: 'content' },
      { path: '', component: PedidoComponent, outlet: 'pedido' }
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

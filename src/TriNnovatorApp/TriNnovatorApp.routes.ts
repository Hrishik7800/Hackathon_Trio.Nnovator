import { Routes } from '@angular/router';
import { LoginComponent } from './layouts/profile/login/login.component';
import { LayoutComponent } from './layouts/layout.component';
import { homeguardGuard } from './services/homeguard.guard';
import { NodesComponent } from './layouts/nodes/nodes.component';
import { SelectivedataloadER1Component } from './layouts/selectivedataloadER1/selectivedataloader1.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    // canActivate: [homeguardGuard],
    component: LayoutComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [homeguardGuard],
    children: [
      { path: 'selectivedataload/:typeID', component: SelectivedataloadER1Component },
      { path: 'nodes/:itemid/:itemtypeid', component: NodesComponent },
    ],
  },
];

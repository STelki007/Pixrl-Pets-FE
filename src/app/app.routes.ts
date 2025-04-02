import { Routes } from '@angular/router';
import {MainPageComponent} from './components/main-page-component/main-page-component';
import { canActivateAuthRole } from '@guards/auth.guard';

export const routes: Routes = [
  // { path: '', component: MainPageComponent, canActivate: [canActivateAuthRole] },
  { path: '', component: MainPageComponent },
];

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page-component/main-page-component';

export const routes: Routes = [
  // { path: '', component: MainPageComponent, canActivate: [canActivateAuthRole] },
  { path: '', component: MainPageComponent },
];

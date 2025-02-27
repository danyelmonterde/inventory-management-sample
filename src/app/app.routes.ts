import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'inventory', component: ProductListComponent },
  { path: '**', redirectTo: '' }
];
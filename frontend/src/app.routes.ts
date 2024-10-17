import { Routes } from '@angular/router';
import { HomeComponent } from '@feature/home/home.component';
import { NoFoundComponent } from '@feature/no-found/no-found.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'NoFoundComponent', component: NoFoundComponent}, 

  // defaults components
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // ruta de inicio
  { path: '**', component: NoFoundComponent }, // rutas para no encontradas
];
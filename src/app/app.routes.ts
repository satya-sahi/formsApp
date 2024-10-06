import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateFormsComponent } from './create-forms/create-forms.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login', component: LogInComponent},
    {path: 'home', component : HomePageComponent},
    {path: 'edit-film', component : CreateFormsComponent},

];

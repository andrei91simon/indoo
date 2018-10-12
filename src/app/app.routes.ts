import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { AddProjectComponent } from './add-project/add-project.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectViewComponent },
  { path: 'add', component: AddProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];

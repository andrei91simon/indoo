import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { DragDropDirective } from './drag-drop/drag-drop.directive';

import { AppComponent } from './app.component';

import { appRoutes } from './app.routes';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';
import { ProjectService } from './project.service';
import { ProjectViewComponent } from './project-view/project-view.component';
import { LoginComponent } from './login/login.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectPreviewComponent,
    ProjectViewComponent,
    LoginComponent,
    AddProjectComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BusyModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
      ),
    SortableModule.forRoot()
  ],
  providers: [
    AuthService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

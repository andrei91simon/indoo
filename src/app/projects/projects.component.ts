import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../model/project';
import { ProjectService } from '../project.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  title = 'ProjectsComponent';
  projects: Observable<Project[]>;

  constructor(
    private projectService: ProjectService,
    public auth: AuthService) {
      auth.handleAuthentication();
    }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    console.log(this.projects);
  }

}

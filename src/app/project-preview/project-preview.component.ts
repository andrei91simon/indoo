import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})

export class ProjectPreviewComponent implements OnInit {
  title = 'ProjectPreview';
  @Input() project: Project;
  busy: Subscription;

  constructor(
		private projectService: ProjectService,
    private router: Router,
    public auth: AuthService
    ) {
    	auth.handleAuthentication();
    }

  ngOnInit() {
  }


  deleteProject() {
    let answer: boolean = confirm(`Delete project ${this.project.title}?`);
    if (answer) {
      this.busy = this.projectService.deleteProject(this.project._id).subscribe(router => this.router.navigate(["/projects"]));
    	window.location.reload();
    } else {
      this.router.navigate(['/projects']);
    }
  }
}

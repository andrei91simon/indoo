import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  componentName = 'ProjectViewComponent';
  imageUrls: string[];
  project: Project = {};
  largeImage: String = "";
  busy: Subscription;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService
    ) { 
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.route.params.switchMap(params => this.projectService.getProjectById(params.id))
    .subscribe(project => this.project = project);
  }

  changeImage(newSrc) {
    this.project.image = newSrc;
  }

  deleteProject() {
    let answer: boolean = confirm("Delete project?");
    if (answer) {
      this.busy = this.projectService.deleteProject(this.project._id).subscribe(router => this.router.navigate(["/projects"]));
    } else {
      console.log('good');
    }
  }

}

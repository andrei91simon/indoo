import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../model/project';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})

export class ProjectPreviewComponent implements OnInit {
  title = 'ProjectPreview';
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

}

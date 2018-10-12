import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../model/project';
import { SortableComponent } from 'ngx-bootstrap/sortable';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { each } from 'lodash';
import { NgForm } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  componentName = 'AddProjectComponent';

  project: Project = {};
  previewPhotos: {file: File, preview?: string, index: number}[];
  busy: Subscription;

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  saveProject(): void {
    let formData = new FormData();
    this.project.photoUrls = [];

    for (let p of this.previewPhotos) {
      this.project.photoUrls.push("https://s3.amazonaws.com/indoodesign/" + p.file.name);
      formData.set('photo', p.file);
      this.http.post<boolean>(`http://localhost:3000/projects/uploadPhoto`, formData).subscribe();
    }
    this.project.image = this.project.photoUrls[0];
    for (let p of this.previewPhotos) {
      this.http.post<string>(`http://localhost:3000/projects/uploadToS3`, {"filename": p.file.name}).subscribe();
    }
    this.http.post<Project>(`http://localhost:3000/projects`, this.project).subscribe((project: Project) => {
      this.project._id = project._id;
      this.router.navigate(['/projects']);
    });
  }

  onDropHandler(event: any): void {
    // fired when files are dropped from another app outside the browser (via drag-drop.directive)
    this.previewPhotos.push({index: this.previewPhotos.length, file: event.file, preview: event.event.target.result});
    console.log('file drop:', this.previewPhotos);
    this.sortableComponent.writeValue(this.previewPhotos);
  }

  fileChange(event: any): void {
    // fired when files are chosen from file input dialog
    each(event.target.files, (file: File, i: number) => {
      if (!file.type.match(/image-*/)) {
        return;
      }
      let index = this.previewPhotos.length;
      this.previewPhotos.push({file, index});
      let reader = new FileReader();
      reader.onload = (e: any): void => {
        console.log('FileReader onload');
        this.previewPhotos[index].preview = reader.result;
        this.sortableComponent.writeValue(this.previewPhotos);
      };
      reader.readAsDataURL(file);
    });
    console.log('file picker:', this.previewPhotos);
  }

  reorderImages(previewPhotos: {file: File, preview?: string, index: number}[]): void {
    // fired when images are moved
    this.previewPhotos = previewPhotos;
  }

  removePhoto(i: number): void {
    // fired when image 'x' is clicked
    this.previewPhotos.splice(i, 1);
    this.sortableComponent.writeValue(this.previewPhotos);
  }
}

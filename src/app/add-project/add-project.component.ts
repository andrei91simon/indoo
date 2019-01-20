import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../project.service';
import { SortableComponent } from 'ngx-bootstrap/sortable';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { each } from 'lodash';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss', '../../../node_modules/angular2-busy/build/style/busy.css']
})
export class AddProjectComponent implements OnInit {
  componentName = 'AddProjectComponent';

  project: Project = {};
  previewPhotos: {file: File, preview?: string, index: number}[];
  closeOnSave: boolean = false;
  busy: any;

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProjectService
    ) { }

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.busy = this.service.getProjectById(params.id).subscribe((project: Project) => {
          this.project = project;
        });
      }
    });
  }

  saveProject(): Promise<boolean> {
    let formData = new FormData();
    if (this.project._id) {
      let payload = {
        'title': this.project.title,
        'category': this.project.category,
        'location': this.project.location,
        'area': this.project.area,
        'status': this.project.status,
        'image': this.project.photoUrls[0],
        'photoUrls': this.project.photoUrls,
      };
      for (let p of this.previewPhotos) {
        this.project.photoUrls.push('https://s3.amazonaws.com/indoodesign/' + p.file.name);
        formData.append('photos', p.file);
      }
      this.busy = this.http.post<boolean>(`https://pure-bastion-78866.herokuapp.com/projects/uploadToS3`, formData).subscribe(x => {
        console.log("this is x", x);
        if (x) {
          this.http.patch<Project>(`https://pure-bastion-78866.herokuapp.com/projects/${this.project._id}`, payload).subscribe((project: Project) => {
            if (!this.closeOnSave) {
              this.previewPhotos = [];
              this.loadProject();
            } else {
              this.router.navigate(['/projects']);
            }
          });
          return;
        } else {
          console.log('Project could not be loaded at this time');
        }
      });
      return;
    }
    this.project.photoUrls = [];

    for (let p of this.previewPhotos) {
      this.project.photoUrls.push('https://s3.amazonaws.com/indoodesign/' + p.file.name);
      formData.append('photos', p.file);
    }
    console.log('this is the formdata', formData);
    this.busy = this.http.post<boolean>(`https://pure-bastion-78866.herokuapp.com/projects/uploadToS3`, formData).subscribe(x => {
      console.log('this is x', x);
      if (x) {
        this.project.image = this.project.photoUrls[0];
        this.http.post<Project>(`https://pure-bastion-78866.herokuapp.com/projects`, this.project).subscribe((project: Project) => {
          this.project._id = project._id;
          if (!this.closeOnSave) {
            this.loadProject();
          } else {
            this.router.navigate(['/projects']);
          }
        });
      } else {
        console.log('Project could not be loaded at this time');
      }
    }); 
    return new Promise(resolve => true);
  }

  saveAndClose() {
    this.closeOnSave = true;
    this.saveProject().then(x => this.router.navigate(['/projects']));
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

  reorderExistingImages(photoUrls: string[]): void {
    // fired when images are moved
    this.project.photoUrls = photoUrls;
    console.log(this.project.photoUrls);
  }

  removeExistingPhoto(i: number): void {
    // fired when image 'x' is clicked
    this.project.photoUrls.splice(i, 1);
    console.log(this.project.photoUrls);
    this.project.photoUrls = [...this.project.photoUrls];
  }
}

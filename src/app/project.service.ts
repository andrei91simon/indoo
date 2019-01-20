import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/shareReplay';

import { Project } from '../model/project';

export const SampleProjects: Project[] = [
  {
    _id: '1',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg',
    'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg',
    'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg',
    'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg',
    'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg', 'assets/indoo.design/slides/slide1.jpg']
  },
  {
    _id: '2',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '3',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '4',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '5',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '5',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '6',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  },
  {
    _id: '7',
    title: '',
    category: 'C. APARTAMENT',
    location: 'Cluj',
    area: 130,
    status: 'In progress',
    image: 'assets/indoo.design/slides/slide1.jpg',
    photoUrls: ['']
  }
];

@Injectable()
export class ProjectService {
  title = 'ProjectService';

  constructor (
    private http: HttpClient) {}

  getSampleProjects(): Project[] {
    return SampleProjects;
  }

  getSampleProjectById(id: string): Project {
    return SampleProjects.find(x => x._id === id);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`https://pure-bastion-78866.herokuapp.com/projects`).shareReplay();
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`https://pure-bastion-78866.herokuapp.com/projects/${id}`).shareReplay();
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`/api/projects`, project);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`https://pure-bastion-78866.herokuapp.com/projects/${id}`);
  }
}


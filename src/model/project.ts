export interface  BaseProject {
  title?: string;
  category?: string;
  location?: string;
  area?: number;
  status?: string;
  image?: string;
  photoUrls?: string[];
}

export interface Project extends BaseProject {
  _id?: string;
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html',
  styleUrls: ['carousel.scss']
})

export class Carousel {
  componentName: string = "Carousel";
  @Input() images: string[];

  constructor(
    ) {}

}
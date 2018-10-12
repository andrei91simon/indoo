import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() dropHandler: EventEmitter<any> = new EventEmitter<any>();

  public dragging: boolean;
  public loaded: boolean;
  public imageLoaded: boolean;
  public imageSrc: string;
  public invalidFlag: boolean;
  public filename: string;
  public file: Blob;

  @HostListener('dragover') onDragOver(): boolean {
    return false;
  }

  @HostListener('dragenter') handleDragEnter(): void {
    this.dragging = true;
  }

  @HostListener('dragleave') handleDragLeave(): void {
    this.dragging = false;
  }

  @HostListener('drop', ['$event']) handleDrop(e: any): void {
    e.preventDefault();
    this.dragging = false;
    if(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
      this.handleInputChange(e);
    }
  }

  handleInputChange(e: any): any {
    let file: any = e.dataTransfer.files[0];
    console.log("DragnAndDrop change", file);
    this.invalidFlag = false;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.invalidFlag = true;
      alert('invalid format');
      return this.dropHandler.emit({ event: e, invalidFlag: this.invalidFlag });
    }
    this.loaded = false;
    this.file = file; // save the actual File so it can be uploaded
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.filename = file.name;
  }

  handleReaderLoaded(e: any): void {
    console.log("FileReader onload", e);
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.dropHandler.emit({ event: e, file: this.file, invalidFlag: this.invalidFlag, name: this.filename });
  }
}

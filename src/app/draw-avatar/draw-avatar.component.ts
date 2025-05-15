import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-draw-avatar',
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './draw-avatar.component.html',
  styleUrl: './draw-avatar.component.css'
})
export class DrawAvatarComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private pixelSize = 20;
  private isDrawing = false;
  selectedColor: string = '#000000';
  isEraserActive = false;
  isExport = false;
  getAllPosition: { x: number, y: number, backgroundColor: string }[] = [];
  profileImage: string = "https://www.svgrepo.com/show/452030/avatar-default.svg";
  selectedColorsHistory: string[] = [];

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  ngOnInit(): void {
    this.getImageFromLocalStorage();
  }

  getImageFromLocalStorage() {
    const storedImage = localStorage.getItem("userProfileImage");
    if (storedImage) {
      this.profileImage = storedImage;
    }
  }

  setupCanvas() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext("2d")!;
    this.drawGrid();

    canvas.addEventListener('mousedown', () => (this.isDrawing = true));
    canvas.addEventListener('mouseup', () => (this.isDrawing = false));
    canvas.addEventListener('mouseleave', () => (this.isDrawing = false));
    canvas.addEventListener('mousemove', (event) => this.handleDrawing(event));
  }

  handleDrawing(event: MouseEvent) {
    if (!this.isDrawing) return;

    if (this.isEraserActive) {
      this.removePixel(event);
    } else {
      this.drawPixel(event);
    }
  }

  drawGrid() {
    this.ctx.strokeStyle = '#ddd';
    for (let x = 0; x < this.canvas.nativeElement.width; x += this.pixelSize) {
      for (let y = 0; y < this.canvas.nativeElement.height; y += this.pixelSize) {
        this.ctx.strokeRect(x, y, this.pixelSize, this.pixelSize);
      }
    }
  }

  drawPixel(event: MouseEvent) {
    const { x, y } = this.getMousePosition(event);
    this.ctx.fillStyle = this.selectedColor;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);

    if (!this.getAllPosition.find(pos => pos.x === x && pos.y === y)) {
      this.getAllPosition.push({x: x, y: y, backgroundColor: this.selectedColor});
      this.isExport = true;
    }

  }

  removePixel(event: MouseEvent) {
    const { x, y } = this.getMousePosition(event);
    this.ctx.clearRect(x, y, this.pixelSize, this.pixelSize);

    this.ctx.strokeStyle = '#ddd';
    this.ctx.strokeRect(x, y, this.pixelSize, this.pixelSize);

    this.getAllPosition = this.getAllPosition.filter((pos) => {
      return !(pos.x === x && pos.y === y);
    });
  }

  toggleEraser() {
    this.isEraserActive = !this.isEraserActive;
  }

  private getMousePosition(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.pixelSize) * this.pixelSize;
    const y = Math.floor((event.clientY - rect.top) / this.pixelSize) * this.pixelSize;
    return { x, y };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.drawGrid();
    this.isExport = false;
    this.getAllPosition = [];
  }

  safeTheImage() {
    if (this.isExport) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = 400;
      canvas.height = 400;
      const pixelSize = 20;

      this.getAllPosition.forEach(({ x, y, backgroundColor }) => {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      });

      const dataURL = canvas.toDataURL('image/png');

      if (dataURL){
        localStorage.removeItem('userProfileImage');
        localStorage.setItem('userProfileImage', dataURL);
        this.profileImage = dataURL;
      }

      //
      // const a = document.createElement('a');
      // a.href = dataURL;
      // a.download = 'pixel-art.png';
      // a.click();
      // console.log(a)
    }
  }

  setExistedColor(bgBlack: string) {
    this.selectedColor = bgBlack;
  }

}

import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Damage } from '../types/damage';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'draw-image',
  templateUrl: './draw-image.component.html',
  styleUrl: './draw-image.component.css',
})
export class DrawImageComponent implements OnInit {
  http = inject(HttpClient);

  route = inject(ActivatedRoute);

  @Input() image!: { side: string; src: string };
  @ViewChild('drawingCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('backgroundImg', { static: false }) imgRef!: ElementRef<HTMLImageElement>;

  carId: number = 0;
  damages: Damage[] = [];
  addingDamage = false;
  coordinates: {x: number,y: number} = {x:0,y:0};

  damageForm = new FormGroup({
    description: new FormControl(''),
    type: new FormControl(''),
  });

  ngOnInit() {
    this.route.params.subscribe({
      next: (data: any) => (this.carId = Number(data.id)),
      error: (err) => console.log(err),
    });
    this.http
      .get(`http://localhost:3000/damages/cars/${this.carId}`)
      .subscribe({
        next: (data: any) => {
          this.damages = data.data;
          this.syncCanvasWithImage();
        },
        error: (err) => console.log(err),
      });
  }

  onImageLoad(){
    this.syncCanvasWithImage()
  }

  colorByType(type: string){
    const colorByTypes: any = {
      scratch: "black",
      dent:"red",
      crack: "blue"
    }
   return colorByTypes[type] || "black"
  }

  syncCanvasWithImage() {
    
    const canvas = this.canvasRef.nativeElement;
    const img = this.imgRef.nativeElement;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;


    const ctx = canvas.getContext('2d');

    if (ctx) {
      const damagesBySide = this.damages.filter(
        (damage) => damage.car_side === this.image.side
      );
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      damagesBySide.forEach((damage) => {
        const x = damage.x_coordinate * canvas.width;
        const y = damage.y_coordinate * canvas.height;
        ctx.font = '16px Arial';
        ctx.strokeStyle = this.colorByType(damage.type)
        ctx.fillStyle = this.colorByType(damage.type);
        ctx.fillText(damage.description, x + 10, y + 5);
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y + 10);
        ctx.moveTo(x + 10, y - 10);
        ctx.lineTo(x - 10, y + 10);
        ctx.stroke();
      });
    }
  }

  submitDamage() {
    const damageFormValue = this.damageForm.value;

    const newDamage: Damage = {
      x_coordinate: this.coordinates.x,
      y_coordinate: this.coordinates.y,
      description: damageFormValue.description || '',
      car_id: this.carId,
      car_side: this.image.side,
      type: damageFormValue.type || '',
    };
    this.http.post('http://localhost:3000/damages', newDamage).subscribe({
      next: (data: any) => {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          const x = this.coordinates.x * canvas.width;
          const y = this.coordinates.y * canvas.height;

         
          ctx.font = '16px Arial';
          ctx.strokeStyle = this.colorByType(data.data.type)
          ctx.fillStyle = this.colorByType(data.data.type);
          ctx.fillText(data.data.description, x + 10, y + 5);
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y + 10);
        ctx.moveTo(x + 10, y - 10);
        ctx.lineTo(x - 10, y + 10);
        ctx.stroke();

          this.addingDamage = false
          this.damageForm.reset()
        }
      },
      error: (err) => alert(err.error.message),
    });
  }

  onCanvasClick(event: MouseEvent) {
    this.addingDamage = true;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const relX = x / canvas.width;
    const relY = y / canvas.height;

    this.coordinates.x = relX;
    this.coordinates.y = relY;
  }

  closeModule(){
    this.addingDamage = false
  }
}

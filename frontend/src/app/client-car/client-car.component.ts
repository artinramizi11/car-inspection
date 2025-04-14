import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, Input, QueryList, ViewChildren } from "@angular/core";
import { Car } from "../types/car";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DrawImageComponent } from "../draw-image/draw-image.component";

@Component({
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule,DrawImageComponent],
    selector: "client-car",
    templateUrl: "./client-car.component.html",  
    styleUrl: "./client-car.component.css",
    providers: [HttpClient]
})
export class ClientCarDomponent  {

    @ViewChildren('backgroundImg') imgRefs!: QueryList<ElementRef>;
    @ViewChildren('drawingCanvas') canvasRefs!: QueryList<ElementRef>;
    @Input() car!: Car


    http = inject(HttpClient)
    response: any = {}
    addingDamage = false


    images = [
        {side: "front", src: "front.jpeg"},
        {side: "left", src: "left.jpeg"},
        {side: "right", src: "right.jpeg"},
        {side: "top", src: "top.jpeg"},
        {side: "back", src: "back.jpeg"}
    ]

    getImageBySide(side:string){
      const object = this.images.find(image => image.side === side)
      return object!
    }


  

    markAsRepaired(id: number) {
        this.http.post(`http://localhost:3000/cars/${id}`, null).subscribe({
          next: (data: any) => this.car.id === id ? this.car.status = data.data.status : null,
          error: (err) => {
          alert(err.error.message);
          }
        });
      }
}
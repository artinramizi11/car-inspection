import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { Car } from "../types/car";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
    imports: [CommonModule],
    templateUrl: "./car-detail.component.html",
    styleUrl: "./car-detail.component.css",

})
export class CarDetailComponent implements OnInit {

    images = [
        {side: "front", src: "front.jpeg"},
        {side: "left", src: "left.jpeg"},
        {side: "right", src: "right.jpeg"},
        {side: "top", src: "top.jpeg"},
        {side: "back", src: "back.jpeg"}
    ]

    @ViewChild('drawingCanvas', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement> 
    @ViewChild("bgImage", {static: false}) imgRef!: ElementRef<HTMLImageElement>

    route = inject(ActivatedRoute)
    router = inject(Router)
    http = inject(HttpClient)
    carId: string | null = null
    car: Car = {} as Car
    error = ''
    loading = true

    testingLoad(side: string){
        this.syncCanvasImage(side)
    }

   

    syncCanvasImage(side: string){
        const canvas = this.canvasRef.nativeElement;
        const img = this.imgRef.nativeElement;
    
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;

        const ctx = canvas.getContext('2d');
        
        if(ctx){
            this.car.damages.filter((damage) => {
                damage.car_side === side
            }).map((damage) => {
                const x = damage.x_coordinate * canvas.width
                const y = damage.y_coordinate * canvas.height

                ctx.font = '16px Arial';
                ctx.fillText("test", x,y);
                ctx.beginPath();
                ctx.arc(x,y, 2, 0, Math.PI * 2);
                ctx.fill();
            })
           
          
        }

    }



  

    ngOnInit(): void {
        this.carId = this.route.snapshot.paramMap.get('id');
        this.http.get(`http://localhost:3000/cars/${this.carId}`).subscribe({next: (data: any) => {
            this.loading = false
            this.car = data.data
        }, error: (err) => {
            this.error = err.error.message
            this.loading = false
        }})
        
    }

    countSideDamages(side: string){
        return this.car.damages?.filter((damage) => damage.car_side === side).length
        
    }

}
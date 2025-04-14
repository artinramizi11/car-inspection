import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from "@angular/core";
import { Car } from "../types/car";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: 'inspection-component',
    imports: [CommonModule],
    templateUrl: "./inspection.component.html",
    styleUrl: "./inspection.component.css",
    providers: []
})
export class InspectionComponent implements OnInit {

    http = inject(HttpClient)
    router = inject(Router)

    cars: Car[] = []
    error = ""

    ngOnInit(): void {
        this.http.get<Car[]>("http://localhost:3000/cars").subscribe({next: (data: any) => {
          this.cars = data.data
        }, error: (err) => this.error = err.error.message})
        
    }

    visitCar(id: number) {
        this.router.navigate([`/edit-car/${id}`])

    }

   

  
}
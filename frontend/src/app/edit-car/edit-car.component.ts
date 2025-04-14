import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { Car } from "../types/car";
import { ActivatedRoute } from "@angular/router";
import { ClientCarDomponent } from "../client-car/client-car.component";

@Component({
    standalone: true,
    imports:[ClientCarDomponent],
    selector: "edit-car",
    templateUrl: "./edit-car.component.html",
    styleUrl: "./edit-car.component.css"
})
export class EditCarComponent implements AfterViewInit {

    http = inject(HttpClient)
    route = inject(ActivatedRoute)
    car!: Car  

    ngAfterViewInit(): void {
        const carId = this.route.snapshot.paramMap.get('id');
        this.http.get(`http://localhost:3000/cars/${Number(carId)}`).subscribe({next: (data: any) => this.car = data.data, error: (err) => console.log(err)})
        
    }
}
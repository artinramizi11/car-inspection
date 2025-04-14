import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    imports: [ReactiveFormsModule],
    selector: "register-car",
    templateUrl: "./register-car.component.html",
    styleUrl: "./register-car.component.css"
})
export class RegisterComponent implements OnInit {


    http = inject(HttpClient)
    router = inject(Router)

    registerCarForm = new FormGroup({
        make: new FormControl(""),
        model: new FormControl(""),
        year: new FormControl(""),
        vehicle_personal_number: new FormControl(""),

    })

    ngOnInit(): void {
      const role = localStorage.getItem("role")
      if(role) {
        role === 'worker' ? this.router.navigate(['']) : ""}
    }


    createCar() {
        const formValue = this.registerCarForm.value;
        console.log(formValue)
        const carData = {
          make: formValue.make,
          model: formValue.model,
          year: Number(formValue.year), 
          vehicle_personal_number: Number(formValue.vehicle_personal_number),
        };
      
        this.http.post("http://localhost:3000/cars", carData, {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }).subscribe({next: (data: any) => {
          alert(data.message)
        }, error: (err) => alert(err.error.message)})

        this.registerCarForm.reset()
      }

}
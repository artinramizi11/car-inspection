import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { Client } from "../../types/client";
import { Car } from "../../types/car";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector:"client-home",
    imports: [CommonModule],
    templateUrl: "./client-home.component.html",
    styleUrl: "./client-home.component.css"
})
export class ClientHomeComponent implements OnInit {

    http = inject(HttpClient)
    router = inject(Router)
    clientCars: Car[] = []

    ngOnInit(): void {
        this.http.get("http://localhost:3000/clients/me").subscribe((data: any) => this.clientCars = data.data.cars)
    }


}
import { Component, inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { WorkerHomeComponent } from "./worker/worker.component";
import { ClientHomeComponent } from "./client/client-home.component";

@Component({
    standalone: true,
    selector: "home-component",
    imports: [CommonModule,WorkerHomeComponent,ClientHomeComponent], 
    templateUrl: "./home.component.html",  
    styleUrl: "./home.component.css"
})
export class HomeComponent implements OnInit {


    http = inject(HttpClient);
    router = inject(Router)
    role: string = ''

    ngOnInit(): void {
        const role = localStorage.getItem("role")
        this.role = role ? role : ""
    }

    
}
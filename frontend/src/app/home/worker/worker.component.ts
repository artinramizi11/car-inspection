import { Component, inject, Input, OnInit } from "@angular/core";
import { Client } from "../../types/client";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
    selector:"worker-home",
    imports: [CommonModule],
    templateUrl: "./worker.component.html",
    styleUrl: "./worker.component.css"
})
export class WorkerHomeComponent implements OnInit {

    allClients: Client[] = []
    http = inject(HttpClient)

    ngOnInit(): void {
        this.http.get<Client[]>("http://localhost:3000/clients").subscribe({next: (data: any) => this.allClients = data.data, error: (err) => console.log("Err",err)})

        
    }

}
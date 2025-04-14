import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
    selector: "login-component",
    templateUrl: "./login.component.html",  
    styleUrl: "./login.component.css"
})
export class LoginComponent implements AfterViewInit {

 

    loginAsClient = true;
    loginAsUser = false;
    error = ''

    http = inject(HttpClient)
    router = inject(Router)

    ngAfterViewInit(): void {
        const hasToken = localStorage.getItem("token")
        hasToken ? this.router.navigate(['/']) : null
    }

    clientForm = new FormGroup({
        name: new FormControl(""),
        surname: new FormControl(""),

    })

    userForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")

    })


    showUserLogin(){
        this.loginAsClient = false 
        this.loginAsUser = true
        
    }

    showClientLogin(){
        this.loginAsClient = true 
        this.loginAsUser = false
    }

    loginClient(){
         const clientFormData = this.clientForm.value
        this.http.post("http://localhost:3000/auth/clients/login", clientFormData).subscribe({next: (data: any) => {
            localStorage.setItem("role", "client" )
            localStorage.setItem("token", data.data.token)
            this.router.navigate([''])

        } , error: (error) => alert(error.error.message)})
        this.clientForm.reset()

    }

    loginUser(){
        const userFormData = this.userForm.value 
        this.http.post("http://localhost:3000/auth/users/login", userFormData).subscribe({next: (data: any) => {
            localStorage.setItem("token", data.data.token)
            localStorage.setItem("role", "worker")
            this.router.navigate([''])
        }, error: (err) => alert(err.error.message)})
        this.userForm.reset()

    }

}
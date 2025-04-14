import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked  {

  isLogged = false;
  role = ""

  title = "hello"
  router = inject(Router)

  ngAfterViewChecked(): void {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    token ? this.isLogged = true : this.isLogged = false
    role ? this.role = role : ""
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    this.isLogged = false
    this.router.navigate(['login'])
  }

  



}

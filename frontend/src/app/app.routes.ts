import { Routes } from '@angular/router';
import { RegisterComponent } from './register-car/register-car.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { InspectionComponent } from './inspection/inspection.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { EditCarComponent } from './edit-car/edit-car.component';

export const routes: Routes = [
    {path: "", component: HomeComponent, canActivate: [AuthGuard] },
    {path: "inspections", component: InspectionComponent, canActivate: [AuthGuard]},
    {path: "register-car", component: RegisterComponent, canActivate: [AuthGuard]},
    {path: "car-detail/:id", component: CarDetailComponent, canActivate: [AuthGuard]},
    {path: "edit-car/:id", component: EditCarComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent},
];

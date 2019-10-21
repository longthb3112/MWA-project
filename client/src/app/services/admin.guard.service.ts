import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(): boolean {
        let role = localStorage.getItem('role');
        if (role === 'client') {
            this.router.navigate(['task']);
            return false;
        }
        return true;

    }

}
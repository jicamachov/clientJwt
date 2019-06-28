import { AuthService } from './../_service/auth.service';
import { Subscription } from 'rxjs';
import { OnDestroy, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RefreshToken implements OnDestroy {

    refreshTokenSubscription: Subscription;

    constructor(
        private router: Router,
        private auth: AuthService
    ) {}

    refresh(reject) {
        if (reject.status == 401) {
            console.log(`Error is ${reject.status}`);
            const errorDescription = reject.error.error_description;
            console.log(errorDescription);
            if (errorDescription.indexOf('Access token expired') !== -1) {
                const response = window.confirm('Warnig ¿Desea continuar con la sesion?');
                if(response) {
                    this.refreshTokenSubscription = this.auth.onRefreshToken()
                    .subscribe(
                        record => {
                            console.log('New Token ----> ', record);
                            window.sessionStorage.setItem('token', JSON.stringify(record));
                            return;
                    }, 
                        reject => {
                            window.alert('Ups! lo sentimos su sesion ha expirado!');
                            this.refresh(reject);
                        }
                    );
                }
            } else if (errorDescription.indexOf('Invalid refresh token (expired)') !== -1) {
                sessionStorage.removeItem('token');
                this.router.navigate(['login']);
                return;
            }
        }
    }
    ngOnDestroy() { }
}
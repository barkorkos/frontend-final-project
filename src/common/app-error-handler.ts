import { ErrorHandler } from '@angular/core';
import { Utils } from 'app/utils';
import { from } from 'rxjs';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        Utils.showNotification('error', 'An unexpected error occurred', 'danger');
        console.log(error);
    }
}
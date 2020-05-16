import { AbstractControl } from "@angular/forms";
import { ElementSchemaRegistry } from "@angular/compiler";

export class PasswordValidators {
    // static validOldPassword(control: AbortController){
    //     return new Promise(resolve =>{

    //     })
    // }
    static passwordsShouldMatch(control: AbstractControl){
        let newPasword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');
        if (newPasword.value !== confirmPassword.value)
            return { passwordsShouldMatch: true};
        return null;

    }
}
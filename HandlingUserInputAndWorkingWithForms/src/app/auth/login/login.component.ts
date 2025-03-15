import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null
  }

  return { doesNotContainQuestionMark: true }
}

function emailIsUnique(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value === 'test@example.com' ? { notUnique: true } : null);
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: (emailIsUnique)
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email
    const enteredPassword = this.form.value.password

    console.log(enteredEmail, enteredPassword);

  }
}




// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime, timeout } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form')
//   private destroyRef = inject(DestroyRef)

//   constructor() {
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form')

//       if (savedForm) {
//         setTimeout(() => {
//           this.form().setValue({
//             email: JSON.parse(savedForm).email,
//             password: ''
//           })
//         }, 1)
//       }

//       var subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
//       })

//       this.destroyRef.onDestroy(() => {
//         subscription?.unsubscribe()
//       })
//     })
//   }

//   onSubmit(formData: NgForm) {
//     if (formData.form.invalid) {
//       return;
//     }

//     const enteredEmail = formData.form.value.email;
//     const entersPassword = formData.form.value.password;
//     console.log(enteredEmail, entersPassword);

//     formData.form.reset()

//   }
// }

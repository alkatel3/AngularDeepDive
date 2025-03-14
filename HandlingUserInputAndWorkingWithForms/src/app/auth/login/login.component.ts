import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form')
  private destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form')

      if (savedForm) {
        setTimeout(() => {
          this.form().setValue({
            email: JSON.parse(savedForm).email,
            password: ''
          })
        }, 1)
      }

      var subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      })

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe()
      })
    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const entersPassword = formData.form.value.password;
    console.log(enteredEmail, entersPassword);

    formData.form.reset()

  }
}

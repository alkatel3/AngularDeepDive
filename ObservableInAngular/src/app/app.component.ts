import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount)
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 })

  customerInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0
    const interval = setInterval(() => {
      // subscriber.error()
      if (timesExecuted > 3) {
        clearInterval(interval)
        subscriber.complete()
        return
      }

      console.log('Emitting new value...')
      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 2000);
  })
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`)
    // })
    toObservable(this.clickCount)
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe()
    // })
    this.customerInterval$.subscribe({
      next: (val) => { console.log(val) },
      complete: () => { console.log('Completed') }
    })
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(val)
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1)
  }
}

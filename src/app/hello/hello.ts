import { Component, signal, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {

  protected title = 'String Interpolation';

  protected isDisabled: boolean = false;

  protected onClick(): void {
    console.log('Button clicked');
    this.isDisabled = !this.isDisabled;
  }

  protected count = signal(0);

  // computed siganls only run when their dependencies are changed
  // only use computed siganls for computed values only
  // dervived state, needs a return value
  protected doubleCount = computed(() => this.count() * 2);

  // effects react to state changes (refresh browser)
  // do not return values
  // can used to find bugs, persist local storage, integrate 3rd part libraries
  //
  private readonly countLog = effect( () => {
    console.log('Count changed:', this.count())
  });

  // adding console log in a computed signal is a side effect, #effects
  // runs everytime change detection kicks in not optimal

  /*
  // adding console log in a computed signal is a side effect, #effects
  protected getDoubleCount() {
    console.log('getDoubleCount called' );
    return this.count() * 2;
  }
  */

  protected addCount(): void {
    // count = count + 1; lol
    this.count.update(value => value + 1);
  }

  protected minusCount(): void {
    this.count.update(value => value + - 1);
  }

  protected resetCount(): void {
    this.count.set(0);
  }
}

// templates are declarative meaning things showed only be showed to the user
// and components are only the logic
// this constitutes writable and computed signals, next is effects

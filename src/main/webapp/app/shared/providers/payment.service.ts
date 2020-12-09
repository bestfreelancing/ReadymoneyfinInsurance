import { Injectable } from '@angular/core';

export interface ICustomeWindow extends Window {
  _custom_global_stuff: String;
}

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  get nativeWindow(): ICustomeWindow {
    return getWindow();
  }
}

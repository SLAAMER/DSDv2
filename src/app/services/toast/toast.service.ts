import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast: HTMLIonToastElement;

  constructor(private controller: ToastController) { }

  async present(message: string = '', duration: number = 2000, position: string = 'bottom') {
    this.toast = await this.controller.create({
      message: message,
      position: position,
      duration: duration
    });
    return await this.toast.present();
  }

  async dismiss(){
    return await this.toast.dismiss();
  }
}

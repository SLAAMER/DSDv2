import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: any;

  constructor(private controller: LoadingController) { }

  async present(spinner: string = 'crescent', content: string = 'Loading...') {
    this.loading = await this.controller.create({
      spinner: spinner,
      content: content,
      dismissOnPageChange: true
    });
    return await this.loading.present();
  }

  async dismiss(){
    return await this.loading.dismiss();
  }
}

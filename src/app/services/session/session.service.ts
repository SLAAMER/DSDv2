import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  session:{ email: string, token: string };

  constructor(private storage: Storage) { }

  async getSession(){
    return await this.storage.get('session');
  }

  async save(email: string, token: string){
    let session = {
      email: email,
      token: token
    }
    this.session = session;
    return await this.storage.set('session', this.session);
  }

  async terminate(){
    return await this.storage.remove('session');
  }

}

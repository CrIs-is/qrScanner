import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];
  private _storage: Storage | null = null;
  constructor(private storage: Storage,private router: Router) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarRegistros();
  }

  async guardarRegistro(format:string, text: string){
    await this.cargarRegistros();
    const nuevo = new Registro(format,text);
    this.registros.unshift(nuevo);
    this._storage.set('registros',this.registros);
    this.abrirRegistro(nuevo);
  }

  async cargarRegistros(){
    this.registros = await this._storage.get('registros') || [];
  }

  async abrirRegistro(registro: Registro){
    this.router.navigate(['/tabs/tab2']);
    switch (registro.type) {
      case 'http':
        await Browser.open({
          url:registro.text,
          toolbarColor:'0275d8',
          presentationStyle:'fullscreen'
        })
        break;

      default:
        break;
    }

  }
}

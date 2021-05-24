import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any = null;
  constructor(private barcodeScanner: BarcodeScanner, private dataLocal: DataLocalService) {}

  ionViewDidEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner.scan({
      prompt:"Colocar codigo frente a la camara"
    }).then(barcodeData => {
      if(!barcodeData.cancelled){
        console.log('Barcode data', barcodeData);
        this.data = barcodeData;
        this.dataLocal.guardarRegistro(barcodeData.format,barcodeData.text);
      }else{
        console.log("Cancelado");
      }
    }).catch(err => {
      console.log('Error', err);
      this.dataLocal.guardarRegistro('QRCode','https://capacitorjs.com/docs/apis/browser');

    });
  }
}

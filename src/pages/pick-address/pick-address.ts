import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [   // test
      {
        id: "1",
        street: "Street test 1",
        number: "001",
        complement: "Apto 157",
        district: "Sete Bicas",
        cod: "000111",
        city: {
          id: "1",
          name: "Porto",
          state: {
            id: "1",
            name: "Porto"
          }
        }
      },
      {
        id: "2",
        street: "Street test 2",
        number: "002",
        complement: "Apto 157",
        district: "Trindade",
        cod: "000222",
        city: {
          id: "1",
          name: "Porto",
          state: {
            id: "1",
            name: "Porto"
          }
        }
      }
    ];
  }

}

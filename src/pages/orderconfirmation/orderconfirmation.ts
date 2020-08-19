import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClientDTO } from '../../models/client.dto';
import { AddressDTO } from '../../models/address.dto';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';


@IonicPage()
@Component({
  selector: 'page-orderconfirmation',
  templateUrl: 'orderconfirmation.html',
})
export class OrderconfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  codOrder: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public orderService: OrderService,
    public loadingCtrl: LoadingController) {

    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items; 

    this.clientService.findById(this.order.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddress(this.order.addressDelivery.id, response['adresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddress(id: string, list: AddressDTO[]) : AddressDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number{
    return this.cartService.total();
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  backCategoryPage(){
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout(){
    let loader = this.presentLoading();
    this.orderService.insert(this.order)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codOrder = this.extractId(response.headers.get('location'));
        loader.dismiss();
      },
      error =>{
        if (error.status == 403){
          loader.dismiss();
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location: string) : string{
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }
}

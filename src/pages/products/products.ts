import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items : ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let category_id = this.navParams.get('category_id');
    this.productService.findByCategory(category_id)
      .subscribe(response => {
        this.items = response['content']
      },
      error => {});
    }
}

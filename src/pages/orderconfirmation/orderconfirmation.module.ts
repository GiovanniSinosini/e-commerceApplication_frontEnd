import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderconfirmationPage } from './orderconfirmation';
import { OrderService } from '../../services/domain/order.service';

@NgModule({
  declarations: [
    OrderconfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderconfirmationPage),
  ],
  providers: [
    OrderService
  ]
})
export class OrderconfirmationPageModule {}

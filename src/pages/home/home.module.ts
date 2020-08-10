import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';

@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)],
})

export class HomeModule {
}
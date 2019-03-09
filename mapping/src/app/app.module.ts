import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { GeoLocationService } from './service/geolocation.service';

import { AppComponent } from './app.component';
import { BaseLayersControlComponent } from './base-layers-control/base-layers-control.component';

import { MapConfig } from './map.config';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayersControlComponent,
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [GeoLocationService, MapConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

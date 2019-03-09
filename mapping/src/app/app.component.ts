import { Component, NgZone, ViewChild} from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

import { GeoLocationService } from './service/geolocation.service';

import { MapConfig } from './map.config';

import { BaseLayersControlComponent } from './base-layers-control/base-layers-control.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(LeafletDirective) public map: L.Map;
  @ViewChild(BaseLayersControlComponent) public baseLayersControl: BaseLayersControlComponent;

  public lat: number;
  public lng: number;
  public layersControl: any;
  public leafletOptions: Object;
  public drawOptions: any;
  public poisLayer: L.FeatureGroup = new L.FeatureGroup();
  public drawer;
  public zoom: number;
  public zoomControlOptions: L.Control.ZoomOptions = {
    position: 'topleft'
  };
  public mapLoaded: boolean;
  public bbox: string;

  constructor (
    private config: MapConfig,
    private zone: NgZone,
    private geoLocationService: GeoLocationService,
  ) {
    this.lat = this.config.lat;
    this.lng = this.config.lng;
    this.leafletOptions = this.config.leafletOptions;
    this.drawOptions = this.config.drawOptions;
    this.layersControl = this.config.layersControl;
    this.poisLayer = this.config.poisLayer;
  }

  public getUserLocation(): void {
    this.geoLocationService.getCurrentPosition()
      .subscribe(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      },
      error => {
        console.log('GeoLocation Error: ', error.message);
      }
    );
  }

  public onMapReady(map: L.Map) {
    this.map = map;
    this.drawer = new L.Draw.Polygon(this.map, this.drawOptions.polygon);
    L.control.scale().addTo(this.map);

    setTimeout(() => {
      this.zone.run(() => {
        this.getUserLocation();
        this.map.invalidateSize();
        this.map.setView([this.lat, this.lng], 12);
        this.bbox = this.map.getBounds().toBBoxString();
      });

      this.mapLoaded = true;
    }, 200);

    // Map Events
    map.on('zoomend', (event: L.ZoomAnimEvent) => {
      setTimeout(() => {
        this.zoom = map.getZoom();
      }, 100);
    });
  }

  public selectLayer(e): void {
    // Remove existing base layer
    this.map.eachLayer(layer => {
      this.map.removeLayer(layer);
    });
    // Add new base layer
    e.map.addTo(this.map);
  }

}

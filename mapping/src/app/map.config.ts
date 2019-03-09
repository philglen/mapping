import { Injectable, NgZone } from '@angular/core';
import * as L from 'leaflet';

@Injectable()
export class MapConfig {
  public leafletOptions: Object;
  public drawOptions: Object;
  public layersControl: Object;
  public poisLayer: L.FeatureGroup;
  // LatLng for 55 Stamford Road, My House
  public lat = 52.92393;
  public lng = -1.11425;
  public bbox = null;

  // Base Layers
  private googleMaps = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data &copy;2018 Google'
  });
  private googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Map data &copy;2018 Google'
  });
  private openStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
    subdomains: ['a', 'b', 'c'],
    attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  private openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 16,
    attribution: `Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                  <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style:
                  &copy; <a href="https://opentopomap.org">OpenTopoMap</a>
                  (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>`
  });
  private natGeo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 15,
    attribution: `Tiles &copy; Esri &mdash; National Geographic, Esri,
                  DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC`
  });
  private mapTiler = L.tileLayer('https://maps.tilehosting.com/styles/darkmatter/{z}/{x}/{y}.png?key=RrA1AQQRNH5m6MKPQl90',
  {
    attribution: `Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                  &copy; <a href="http://cartodb.com/attributions">CartoDB</a>`
  });
  private wikiMedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
  {
    maxZoom: 19,
    attribution: `Map data &copy;<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>`
  });
  private toner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  {
    attribution: `tiles by <a href="http://stamen.com">Stamen Design</a>
                  <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>`
  });

  constructor(private zone: NgZone) {
    this.zone.run(() => {

    this.poisLayer = new L.FeatureGroup();

    this.leafletOptions = {
      layers: [this.googleMaps],
      zoom: 5,
      center: L.latLng(this.lat, this.lng),
      controls: {
        attribution: true
      }
    };

    this.drawOptions = {
      position: 'topleft',
      draw: {
        marker: {
          icon: L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/img/leaflet/marker-icon.png',
            shadowUrl: 'assets/img/leaflet/marker-shadow.png'
          })
        },
        polyline: false,
        rectangle: false,
        circlemarker: false,
        circle: {
          shapeOptions: {
            stroke: true,
            fillColor: '#5bc6cd',
            color: '#fff',
            weight: 5,
            opacity: 1,
            fillOpacity: 0.6,
            radius: 5000
          }
        },
        polygon: {
          shapeOptions: {
            stroke: true,
            fillColor: '#5bc6cd',
            color: '#fff',
            weight: 5,
            opacity: 1,
            fillOpacity: 0.6
          }
        }
      },
      edit: {
        featureGroup: this.poisLayer,
        selectedPathOptions: {
          maintainColor: false,
          moveMarkers: true
        },
        remove: false,
        edit: false
      }
    };

    this.layersControl = {
      baseLayers: [
        {
          img: 'assets/img/map-base-layers/googlemaps.png',
          name: 'Google Maps',
          map: this.googleMaps
        },
        {
          img: 'assets/img/map-base-layers/googlehybrid.png',
          name: 'Google Satellite',
          map: this.googleSatellite
        },
        {
          img: 'assets/img/map-base-layers/openstreet.png',
          name: 'Open Street',
          map: this.openStreet
        },
        {
          img: 'assets/img/map-base-layers/topographic.png',
          name: 'Topographic',
          map: this.openTopo
        },
        {
          img: 'assets/img/map-base-layers/natgeo.png',
          name: 'NatGeo',
          map: this.natGeo
        },
        {
          img: 'assets/img/map-base-layers/dark.png',
          name: 'Dark',
          map: this.mapTiler
        },
        {
          img: 'assets/img/map-base-layers/wikimedia.png',
          name: 'Wikimedia',
          map: this.wikiMedia
        },
        {
          img: 'assets/img/map-base-layers/toner.png',
          name: 'Toner',
          map: this.toner
        }
      ]};
    });
  }
}

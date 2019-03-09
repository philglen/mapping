import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-layers-control',
  templateUrl: './base-layers-control.component.html',
  styleUrls: ['./base-layers-control.component.scss']
})

export class BaseLayersControlComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public baseLayers;
  @Input() public overlays;
  @Input() public showBaseLayerControl;

  @Output() public switchLayer: EventEmitter<any> = new EventEmitter<any>();
  @Output() public switchOverlay: EventEmitter<any> = new EventEmitter<any>();
  @Output() public baseLayerControlVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  public weather = {
    name: 'Weather',
    overlay: null,
    active: false
  };

  public ngOnInit(): void {
    this.baseLayers[0].active = true;
  }

  public ngOnChanges(): void {
      return;
  }

  public ngOnDestroy(): void {
    this.showBaseLayerControl = false;
  }

  public toggleBaseLayerControl(event): void {
    this.stop(event);
    this.showBaseLayerControl = !this.showBaseLayerControl;
    this.baseLayerControlVisible.emit(!this.showBaseLayerControl);
  }

  public selectLayer(layer): void {
    if (event) {
      this.stop(event);
    }
    this.baseLayers.forEach(lyr => {
      lyr.active = false;
    });
    layer.active = true;
    this.switchLayer.emit(layer);
  }

  public toggleOverlay(overlay): void {
    if (event) {
      this.stop(event);
    }
    overlay.active = !overlay.active;
    this.switchOverlay.emit(overlay);
  }

  private stop(e): void {
    e.preventDefault();
    e.stopPropagation();
  }
}

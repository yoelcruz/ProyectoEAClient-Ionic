import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';


declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() editable = false;
  @Input() coords: string;
  @ViewChild('mapa') mapa;
  @Output() changeCoors = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

    this.ngAfterViewInit();

  }

  ngAfterViewInit() {

    setTimeout(() => {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoieW9vZWwiLCJhIjoiY2thY2JmcjNjMWU4bDJ4cGdrNTNtNXJnMSJ9.r33MPlG7pFfSv-1_lQfK4w';

    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 10
      /* center: [ 1.75, 41.63 ]
      zoom: 5.9 */
    });

    // Añadir marcador desde la localización actual
    const marker = new mapboxgl.Marker();
    marker.setLngLat( [ lng, lat ] ).addTo( map );
    // Añadir marker en una posición especifica
    // const marker2 = new mapboxgl.Marker().setLngLat([2.04, 41.332]).addTo(map); // add the marker to the map

    // Añadir marker en el mapa con un clik
    if (this.editable) {
      map.on('click', (e) => {
        marker.setLngLat(e.lngLat);
        /* const marker3 = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map); // add the marker to the map */
        const lngLat = e.lngLat.wrap();
        this.changeCoors.emit(lngLat.lat + ',' + lngLat.lng);
      });
    }
    }, 1000);

    // Set an event listener

  }
}

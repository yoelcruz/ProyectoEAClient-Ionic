import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';


declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

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
      zoom: 15
    });
    const marker = new mapboxgl.Marker().setLngLat( [ lng, lat ] ).addTo( map );
    // Añadir marker en el mapa con un clik
    /* const marker2 = new mapboxgl.Marker().setLngLat([51, 60]).addTo(map); // add the marker to the map
    map.on('click', function(e) {
      console.log('A click event has occurred at ' + e.lngLat);
      let marker3 = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map); // add the marker to the map
    }); */
    }, 1000);

    // Set an event listener

  }
}

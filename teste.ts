import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

export class MapPage {
 constructor(private googleMaps: GoogleMaps) {}

// Load map only after view is initialized
ngAfterViewInit() {
 this.loadMap();
}

loadMap() {
 let element: HTMLElement = document.getElementById('map');
 let map: GoogleMap = this.googleMaps.create(element);
 map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
 let catador: LatLng = new LatLng(-23.616786, -46.669331);
 let coleta: LatLng = new LatLng(-23.618742, -46.667335);
 let position: CameraPosition = {
   target: catador,
   zoom: 18,
   tilt: 30
 };
 map.moveCamera(position);
 let markerColeta: MarkerOptions = {
   position: catador,
   title: 'Coleta'
 };

 let markerCatador: MarkerOptions = {
   position: catador,
   title: 'Catador'
 };

 const mkCatador = map.addMarker(markerCatador)
   .then((marker: Marker) => {
      marker.showInfoWindow();
  });

   const mkColeta = map.addMarker(markerColeta)
   .then((marker: Marker) => {
      marker.showInfoWindow();
  });
 
}

}
import { Component, OnInit } from '@angular/core';
import Globe from 'globe.gl';
// @ts-ignore
import * as d3 from 'd3-dsv';
import indexBy from 'index-array-by';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.pug',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const globe: any = document.getElementById('globe');
    const COUNTRY: string = 'Hungary';
    const OPACITY: number = 0.5;
  
    const myGlobe = Globe()(globe)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .pointOfView({ lat: 47.4, lng: 19.1, altitude: 0.5 })
      .arcLabel((d:any) => `${d.airline}: ${d.srcAirport.city} &#8594; ${d.dstAirport.city}`)
      .arcStartLat((d:any) => +d.srcAirport.lat)
      .arcStartLng((d:any) => +d.srcAirport.lng)
      .arcEndLat((d:any) => +d.dstAirport.lat)
      .arcEndLng((d:any) => +d.dstAirport.lng)
      //.arcDashLength(0.25)
      //.arcDashGap(1)
      .arcStroke(1)
      //.arcDashInitialGap(() => Math.random())
      //.arcDashAnimateTime(4000)
      .arcColor((d: any) => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`])
      .arcsTransitionDuration(0)
      .pointColor(() => 'orange')
      .pointAltitude(0)
      .pointRadius(0.02)
      .pointsMerge(true);

    // load data
    const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]: any) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
    const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]: any) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});
  
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, airportParse)),
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
        .then(d => d3.csvParseRows(d, routeParse))
    ]).then(([airports, routes]) => {
  
      const byIata: any = indexBy(airports, 'iata', false);
      const filteredRoutes = routes
        .filter((d: any) => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
        .filter((d: any)=> d.stops === '0') // non-stop flights only
        .map((d: any) => Object.assign(d, {
          srcAirport: byIata[d.srcIata],
          dstAirport: byIata[d.dstIata]
        }))
        .filter((d: any) => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // international routes from country
      myGlobe
        .pointsData(airports)
        .arcsData(filteredRoutes);
    });
  }
}

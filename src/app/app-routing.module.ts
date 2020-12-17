import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { name } from '../../package.json';

import { BudapestMapComponent } from './pages/budapest-map/budapest-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { ApiViewerComponent } from './pages/api-viewer/api-viewer.component';
import { MapInfoComponent } from './pages/map-info/map-info.component';
import { MapStatsComponent } from './pages/map-stats/map-stats.component';
import { PdfViewerComponent } from './pages/pdf-viewer/pdf-viewer.component';
import { TestComponent } from './pages/test/test.component';
import { CastleforsaleComponent } from './pages/castleforsale/castleforsale.component';
import { MapCompareComponent } from './pages/map-compare/map-compare.component';
import { YtApiComponent } from './pages/yt-api/yt-api.component';
import { StringEditorComponent } from './pages/string-editor/string-editor.component';
import { IndexFujiComponent } from './pages/index-fuji/index-fuji.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { RedditApiComponent } from './pages/reddit-api/reddit-api.component';
import { PaintComponent } from './pages/paint/paint.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { ModelSearchComponent } from './pages/model-search/model-search.component';
import { MagicBallComponent } from './pages/magic-ball/magic-ball.component';
import { BrickViewerComponent } from './pages/brick-viewer/brick-viewer.component';
import { ControlBoardComponent } from './pages/control-board/control-board.component';
import { GlobeComponent } from './pages/globe/globe.component';
import { RssReaderComponent } from './pages/rss-reader/rss-reader.component';
import { NotesComponent } from './pages/notes/notes.component';

const routes: any = [
  { path: '', title: 'Dashboard', component: DashboardComponent },
  { path: 'control', title: 'Control board', component: ControlBoardComponent },
  {
    path: '', title: 'Maps',
    children: [
      { path: 'globe', title: 'Globe', component: GlobeComponent },
      { path: 'bp-map', title: 'Budapest map', component: BudapestMapComponent },
      { path: 'map', title: 'Map', component: MapComponent },
      { path: 'map-info', title: 'Map Info', component: MapInfoComponent },
      { path: 'map-stats', title: 'Map Stats', component: MapStatsComponent },
      { path: 'map-compare', title: 'Map compare', component: MapCompareComponent }
    ]
  },
  {
    path: '', title: 'APIs',
    children: [
      { path: 'rss-reader', title: 'RSS reader', component: RssReaderComponent },
      { path: 'brick-viewer', title: 'Brick viewer', component: BrickViewerComponent },
      { path: 'model-search', title: 'Model search', component: ModelSearchComponent },
      { path: 'movie-search', title: 'Movie search', component: MovieSearchComponent },
      { path: 'reddit-api', title: 'Reddit', component: RedditApiComponent },
      { path: 'api-viewer', title: 'Api Viewer', component: ApiViewerComponent },
      { path: 'castleforsale', title: 'Castleforsale', component: CastleforsaleComponent },
      { path: 'yt-api', title: 'YT API', component: YtApiComponent },
      { path: 'index-fuji', title: 'Index Fuji', component: IndexFujiComponent },
      { path: 'weather', title: 'Weather', component: WeatherComponent },
    ]
  },
  {
    path: '', title: 'Tools',
    children: [
      { path: 'notes', title: 'Notes', component: NotesComponent },
      { path: 'magic-ball', title: 'Magic ball', component: MagicBallComponent },
      { path: 'paint', title: 'Paint', component: PaintComponent },
      { path: 'pdf-viewer', title: 'Pdf Viewer', component: PdfViewerComponent },
      { path: 'string-editor', title: 'String editor', component: StringEditorComponent },
    ]
  },
  { path: 'test', title: 'Test', component: TestComponent },
  { path: 'socket.io', title: 'Test', component: TestComponent, hideInMenu: true },
  { path: '**', title: 'Dashboard', component: DashboardComponent, hideInMenu: true }
];
/*
// Glitch deploy fix
if (window.location.href.indexOf("glitch") != -1) {
  routes.forEach(route => {
    if (route.children) {
      route.children.forEach(subroute => {
        subroute.path = name + '/' + subroute.path
      })
    } else {
      route.path = name + '/' + route.path
    }
  })
  console.log(routes)
}
////
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule { }

export { AppRoutingModule, routes }

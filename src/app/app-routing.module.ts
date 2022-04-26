import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BudapestMapComponent } from './pages/budapest-map/budapest-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { ApiViewerComponent } from './pages/api-viewer/api-viewer.component';
import { MapInfoComponent } from './pages/map-info/map-info.component';
import { MapStatsComponent } from './pages/map-stats/map-stats.component';
import { PdfEditorComponent } from './pages/pdf-editor/pdf-editor.component';
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
import { CovidComponent } from './pages/covid/covid.component';
import { CvGeneratorComponent } from './pages/cv-generator/cv-generator.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { FontViewerComponent } from './pages/font-viewer/font-viewer.component';
import { MegaViewerComponent } from './pages/mega-viewer/mega-viewer.component';
import { WorldmapComponent } from './pages/worldmap/worldmap.component';
import { PanoViewerComponent } from './pages/pano-viewer/pano-viewer.component';
import { WavesGeneratorComponent } from './pages/waves-generator/waves-generator.component';
import { CodeEditorComponent } from './pages/code-editor/code-editor.component';

const routes: Routes = [
  { path: '', data: { title: 'Dashboard' }, component: DashboardComponent },
  { path: 'control', data: { title: 'Control board' }, component: ControlBoardComponent },
  {
    path: '', data: { title: 'Maps' },
    children: [
      { path: 'globe', data: { title: 'Globe' }, component: GlobeComponent },
      { path: 'bp-map', data: { title: 'Budapest map (-)' }, component: BudapestMapComponent },
      { path: 'map', data: { title: 'Map' }, component: MapComponent },
      { path: 'map-info', data: { title: 'Map Info (-)' }, component: MapInfoComponent },
      { path: 'map-stats', data: { title: 'Map Stats (-)' }, component: MapStatsComponent },
      { path: 'map-compare', data: { title: 'Map compare (-)' }, component: MapCompareComponent },
      { path: 'world-map', data: { title: 'World map' }, component: WorldmapComponent}
    ]
  },
  {
    path: '', data: { title: 'APIs' },
    children: [
      { path: 'covid', data: { title: 'COVID' }, component: CovidComponent },
      { path: 'rss-reader', data: { title: 'RSS reader' }, component: RssReaderComponent },
      { path: 'brick-viewer', data: { title: 'Brick viewer (-)' }, component: BrickViewerComponent },
      { path: 'model-search', data: { title: 'Model search (-)' }, component: ModelSearchComponent },
      { path: 'movie-search', data: { title: 'Movie search' }, component: MovieSearchComponent },
      { path: 'reddit-api', data: { title: 'Reddit' }, component: RedditApiComponent },
      { path: 'api-viewer', data: { title: 'Api Viewer' }, component: ApiViewerComponent },
      { path: 'castleforsale', data: { title: 'Castleforsale (-)' }, component: CastleforsaleComponent },
      { path: 'yt-api', data: { title: 'YT API' }, component: YtApiComponent },
      { path: 'index-fuji', data: { title: 'Index Fuji (-)' }, component: IndexFujiComponent },
      { path: 'weather', data: { title: 'Weather' }, component: WeatherComponent },
      { path: 'search', data: { title: 'Search' }, component: SearchResultsComponent },
      { path: 'mega-viewer', data: { title: 'Mega viewer' }, component: MegaViewerComponent },
      
    ]
  },
  {
    path: '', data: { title: 'Tools' },
    children: [
      { path: 'notes', data: { title: 'Notes' }, component: NotesComponent },
      { path: 'magic-ball', data: { title: 'Magic ball' }, component: MagicBallComponent },
      { path: 'paint', data: { title: 'Paint' }, component: PaintComponent },
      { path: 'pdf-editor', data: { title: 'Pdf Editor' }, component: PdfEditorComponent },
      { path: 'string-editor', data: { title: 'String editor' }, component: StringEditorComponent },
      { path: 'cv-generator', data: { title: 'CV generator (-)' }, component: CvGeneratorComponent },
      { path: 'font-viewer', data: { title: 'Font viewer' }, component: FontViewerComponent },
      { path: 'pano-viewer', data: { title: 'Pano viewer' }, component: PanoViewerComponent },
      { path: 'waves-generator', data: { title: 'Waves generator' }, component: WavesGeneratorComponent },
      { path: 'code-editor', data: { title: 'Code editor' }, component: CodeEditorComponent },

    ]
  },
  { path: 'test', data: { title: 'Test' }, component: TestComponent },
  { path: 'socket.io', data: { title: 'Test', hideInMenu: true }, component: TestComponent },
  { path: '**', data: { title: 'Dashboard', hideInMenu: true }, component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule { }

export { AppRoutingModule, routes }

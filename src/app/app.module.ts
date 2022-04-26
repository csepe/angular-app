import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilter } from './pages/map-stats/map-stats.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BudapestMapComponent } from './pages/budapest-map/budapest-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './pages/map/map.component';
import { SliderComponent } from './components/slider/slider.component';
import { ChartComponent } from './components/chart/chart.component';
import { ApiViewerComponent } from './pages/api-viewer/api-viewer.component';
import { MapInfoComponent } from './pages/map-info/map-info.component';
import { MapStatsComponent } from './pages/map-stats/map-stats.component';
import { PdfEditorComponent } from './pages/pdf-editor/pdf-editor.component';
import { TestComponent } from './pages/test/test.component';
import { CastleforsaleComponent } from './pages/castleforsale/castleforsale.component';
import { TableComponent } from './components/table/table.component';
import { MapCompareComponent } from './pages/map-compare/map-compare.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { YtApiComponent } from './pages/yt-api/yt-api.component';
import { StringEditorComponent } from './pages/string-editor/string-editor.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { IndexFujiComponent } from './pages/index-fuji/index-fuji.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { SpotifyPlayerComponent } from './components/spotify-player/spotify-player.component';
import { RedditApiComponent } from './pages/reddit-api/reddit-api.component';
import { PaintComponent } from './pages/paint/paint.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { ModelSearchComponent } from './pages/model-search/model-search.component';
import { ThreeCanvasComponent } from './components/three-canvas/three-canvas.component';
import { MagicBallComponent } from './pages/magic-ball/magic-ball.component';
import { BrickViewerComponent } from './pages/brick-viewer/brick-viewer.component';
import { ControlBoardComponent } from './pages/control-board/control-board.component';
import { GlobeComponent } from './pages/globe/globe.component';
import { RssReaderComponent } from './pages/rss-reader/rss-reader.component';
import { SpaceshipComponent } from './components/spaceship/spaceship.component';
import { NotesComponent } from './pages/notes/notes.component';
import { CovidComponent } from './pages/covid/covid.component';
import { CvGeneratorComponent } from './pages/cv-generator/cv-generator.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { QuillEditorComponent } from './components/quill-editor/quill-editor.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { FontViewerComponent } from './pages/font-viewer/font-viewer.component';
import { MegaViewerComponent } from './pages/mega-viewer/mega-viewer.component';
import { WorldmapComponent } from './pages/worldmap/worldmap.component';
import { PanoViewerComponent } from './pages/pano-viewer/pano-viewer.component';
import { WavesGeneratorComponent } from './pages/waves-generator/waves-generator.component';
import { CodeEditorComponent } from './pages/code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BudapestMapComponent,
    DashboardComponent,
    MapComponent,
    SliderComponent,
    ChartComponent,
    ApiViewerComponent,
    MapInfoComponent,
    MapStatsComponent,
    PdfEditorComponent,
    SearchFilter,
    TestComponent,
    CastleforsaleComponent,
    TableComponent,
    MapCompareComponent,
    SearchFieldComponent,
    YtApiComponent,
    StringEditorComponent,
    ColorPickerComponent,
    IndexFujiComponent,
    WeatherComponent,
    SpotifyPlayerComponent,
    RedditApiComponent,
    PaintComponent,
    MovieSearchComponent,
    ModelSearchComponent,
    ThreeCanvasComponent,
    MagicBallComponent,
    BrickViewerComponent,
    ControlBoardComponent,
    GlobeComponent,
    RssReaderComponent,
    SpaceshipComponent,
    NotesComponent,
    CovidComponent,
    CvGeneratorComponent,
    PdfViewerComponent,
    QuillEditorComponent,
    SearchResultsComponent,
    FontViewerComponent,
    MegaViewerComponent,
    WorldmapComponent,
    PanoViewerComponent,
    WavesGeneratorComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatSliderModule,
    MatCheckboxModule,
    DragDropModule,
    MatButtonToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    PdfViewerModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // Tells Angular we will have custom tags in our templates
  ]
})
export class AppModule { }

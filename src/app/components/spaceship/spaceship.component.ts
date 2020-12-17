import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
const spaceship = {
  "name": "assets/aeLvaKN3cYh",
  "displayName": "spaceship Goodnews",
  "authorName": "Justin Scifres",
  "createTime": "2017-10-25T13:18:31.241978Z",
  "updateTime": "2020-10-22T19:57:38.690274Z",
  "formats": [
    {
      "root": {
        "relativePath": "model.obj",
        "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/1HCuwNJLmvQ/model.obj",
        "contentType": "text/plain"
      },
      "resources": [
        {
          "relativePath": "materials.mtl",
          "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/1HCuwNJLmvQ/materials.mtl",
          "contentType": "text/plain"
        }
      ],
      "formatComplexity": {
        "triangleCount": "3235"
      },
      "formatType": "OBJ"
    },
    {
      "root": {
        "relativePath": "model.gltf",
        "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/2L8gtMp9ccX/model.gltf",
        "contentType": "model/gltf+json"
      },
      "resources": [
        {
          "relativePath": "model.bin",
          "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/2L8gtMp9ccX/model.bin",
          "contentType": "application/octet-stream"
        }
      ],
      "formatComplexity": {
        "triangleCount": "6148"
      },
      "formatType": "GLTF"
    },
    {
      "root": {
        "relativePath": "model.gltf",
        "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/eIn1OvGWpS_/model.gltf",
        "contentType": "model/gltf+json"
      },
      "resources": [
        {
          "relativePath": "model.bin",
          "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/eIn1OvGWpS_/model.bin",
          "contentType": "application/octet-stream"
        }
      ],
      "formatComplexity": {
        "triangleCount": "6148"
      },
      "formatType": "GLTF2"
    },
    {
      "root": {
        "relativePath": "model.fbx",
        "url": "https://poly.googleapis.com/downloads/fp/1603396658690274/aeLvaKN3cYh/cz6IFXP_ceT/model.fbx",
        "contentType": "application/octet-stream"
      },
      "formatComplexity": {},
      "formatType": "FBX"
    }
  ],
  "thumbnail": {
    "relativePath": "aeLvaKN3cYh.png",
    "url": "https://lh3.googleusercontent.com/hJmYW95BmvbiWNrIyeUGzuY2cGBAwSQguE671pchOy8nuTyRH5d_6cuKT5SSzhsh",
    "contentType": "image/png"
  },
  "license": "CREATIVE_COMMONS_BY",
  "visibility": "PUBLIC",
  "isCurated": true,
  "presentationParams": {
    "orientingRotation": {
      "w": 1
    },
    "colorSpace": "LINEAR",
    "backgroundColor": "#607d8b"
  }
}

@Component({
  selector: 'app-spaceship',
  templateUrl: './spaceship.component.pug',
  styleUrls: ['./spaceship.component.scss']
})
export class SpaceshipComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = 'Car';
  data: any;
  item: any;
  viewMode: string = 'card';
  selectedModel: any = spaceship;
  options: any = {
    gridHelper: false,
    canvasColor: 'transparent'
  }

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
   
  }

  
}

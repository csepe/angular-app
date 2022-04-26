import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Folder {
  title: string,
  id: string,
  items: Note[]
}
interface Note {
  title: string,
  text: string,
  color: string,
  type: string
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.pug',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  folders: Folder[] = [
    {
      title: "New",
      id: 'new',
      items: []
    },
    {
      title: "Progress",
      id: 'progress',
      items: []
    },
    {
      title: "Done",
      id: 'done',
      items: []
    }
  ];
  notes: Note[] = [
    {
      title: 'Note 1',
      text: 'Lorem ipsum',
      color: 'red',
      type: 'new'
    },
    {
      title: 'Note 12',
      text: 'Lorem ipsum',
      color: 'yellow',
      type: 'new'
    },
    {
      title: 'Note 2',
      text: 'Lorem ipsum',
      color: 'green',
      type: 'progress'
    },
    {
      title: 'Note 3',
      text: 'Lorem ipsum',
      color: 'blue',
      type: 'done'
    }
  ];
  //doneList: any = [] // [cdkDropListConnectedTo]="[doneList]",

  constructor() { }

  ngOnInit(): void {
    this.notes.forEach((note: Note) => {
      let folder: Folder = this.folders.filter((el: Folder) => el.id == note.type)[0];
      folder.items.push(note);
    })
  }

  drop(event: CdkDragDrop<Note[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}

import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonList, IonLabel
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

//task structure
type Task = { id: number; title: string; done: boolean };

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  //ion imports
  imports: [
    CommonModule, FormsModule, NgFor,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonList, IonLabel
  ]
})
export class HomePage {
  //task list
  tasks: Task[] = [];
  newTask = '';


}

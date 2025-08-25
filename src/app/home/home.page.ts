import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonList, IonLabel
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

//Task structure
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

  //add task
  addTask() {
    const title = (this.newTask || '').trim();
    if (!title) return;
    this.tasks.unshift({ id: Date.now(), title, done: false });
    this.newTask = '';
  }
}

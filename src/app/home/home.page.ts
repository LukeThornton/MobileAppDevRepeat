import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgClass, NgIf } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonList, IonLabel, IonCheckbox,
  IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';

//priority levels for tasks
type Priority = 'yellow' | 'orange' | 'red';
//task structure
type Task = { id: number; title: string; done: boolean; priority: Priority };

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  //ion imports
  imports: [
    CommonModule, FormsModule, NgFor, NgClass, NgIf,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonList, IonLabel, IonCheckbox,
    IonSegment, IonSegmentButton
  ]
})
export class HomePage implements OnInit {
  //task list
  tasks: Task[] = [];
  newTask = '';
  //default color
  priority: Priority = 'yellow';
  //storage object
  private store = new Storage();

  //init storagae
  async ngOnInit() {
  await this.store.create();                  
  const saved = await this.store.get('tasks');
  this.tasks = (saved || []).map((t: any) => ({
    id: t.id,
    title: t.title,
    done: !!t.done,
    priority: t.priority || 'yellow'   
  }));
}


  //add task
  async addTask() {
    const title = (this.newTask || '').trim();
    //remove blank lines
    if (!title) return;    
                         
    this.tasks.unshift({
      id: Date.now(),
      title,
      done: false,
      priority: this.priority
    });

    this.newTask = '';
    //push it to disk
    await this.save();

    // reset picker so it goes back to yellow each time time
    this.priority = 'yellow';
  }

  //task checkmark
  async toggleTask(t: Task) {
    //task done true/false
    t.done = !t.done;   
    //save it                  
    await this.save();
  }

  //remove task
  async deleteTask(id: number) {
    this.tasks = this.tasks.filter(x => x.id !== id);
    await this.save();
  }

  //set priority from picker
  setPriority(p: any) {
    //default back to yelloww
  this.priority = (p as Priority) || 'yellow';
}

  getColor(p: Priority | undefined) {
    // priority to color map
    if (p === 'orange') return 'orange';
    if (p === 'red') return 'red';
    return 'yellow';
  }

  //write list
  private async save() {
    await this.store.set('tasks', this.tasks);
  }
}

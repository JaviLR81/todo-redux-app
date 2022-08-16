import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  filtroActual!: filtrosValidos;
  todos: Todo[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
      .subscribe(({filtro, todos}) => {
        this.filtroActual = filtro;
        this.todos = todos
      })
  }


}

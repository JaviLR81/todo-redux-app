import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import { clearCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';

  filtros: actions.filtrosValidos[] = ['completados', 'pendientes', 'todos'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro')
    //   .subscribe(filtro => {
    //     console.log("~ filtro", filtro)
    //     this.filtroActual = filtro;
    //   });

    this.store.subscribe( state => {
      this.pendientes = state.todos.filter( todo => !todo.completado).length;
      this.filtroActual = state.filtro;
    })
  }

  filtrar(filtro: actions.filtrosValidos){
    this.store.dispatch( actions.setFiltro({ filtro }) );
  }

  clearCompleted(){
    this.store.dispatch( clearCompleted() );
  }

}

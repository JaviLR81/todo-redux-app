import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[] = [
  new Todo("Salvar al mundo"),
  new Todo("Vencer a Thanos"),
  new Todo("Comprar traje de Iron Man"),
  new Todo("Robar escudo del capitan america"),
];

export const todoReducer = createReducer(
  initialState,
  // creando un nuevo arreglo, obteniendo los valores del state y añadiendo el nuevo
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(toggle, (state, {id}) =>  {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo, // breaking the reference
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),
  on(editar, (state, {id, texto}) =>  {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }
    });
  }),
  on(borrar, (state, {id}) =>  state.filter( todo => todo.id !== id )),
  on(toggleAll, (state, {completado}) =>  state.map( todo => {
    return {
        ...todo,
        completado: completado
    };
  })),

);

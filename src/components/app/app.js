import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'


import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ]
    }
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState( ( { todoData } ) => {
      const idx = todoData.findIndex( (el) => el.id === id);
      const newArray = [ 
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      }
    });
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    
    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData, 
        newItem
      ]
      
      return {
        todoData: newArray
      }
    });
  }
  
  onFiltered = (label) => {
    const newArray = this.state.todoData.filter( (item) => {
      if(item.label.toLowerCase().indexOf(label.toLowerCase()) >= 0) {
        return item;
      } 
    });
    console.log(newArray);
    this.setState(({todoData}) => {
      return {
        todoData: newArray
      } 
    })
  }
  
  toggleProperty(arr, id, propKey) {
    const idx = arr.findIndex( (el) => el.id === id );
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propKey]: !oldItem[propKey]}
    
    return [ 
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState( ({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      } 
    });
  }

  onToggleImportant = (id) => {
    this.setState( ({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      } 
    });
  }


  render() {
    
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel 
            filterItem={this.onFiltered}
          />
          <ItemStatusFilter />
        </div>
      
        <TodoList 
          todos={ this.state.todoData }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }/>
        <ItemAddForm onItemAdded={ this.addItem }/>
      </div>
    );
  };
}
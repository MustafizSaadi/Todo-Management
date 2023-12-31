import React, { useState } from 'react';
import './App.css';
import { Textfield } from './Components/Textfield';
import { Todo } from './model';
import TodoList from './Components/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo) {
      setTodos([...todos, {id:Date.now(), todo, isDeleted: false, isDone:false}]);
      setTodo("");
    }
  }

  console.log(todos);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Taskify
        </p>
      </header>
      <Textfield todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

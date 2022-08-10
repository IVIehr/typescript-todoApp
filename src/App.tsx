import React,{useState} from 'react';
import InputField from './components/inputField';
import { Todo } from './components/model';
import Todolist from './components/todolist';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    console.log(`${todo} added`);
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      // Empty the input
      setTodo("");
    }
  }

  console.log(todos);
  
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <Todolist todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;

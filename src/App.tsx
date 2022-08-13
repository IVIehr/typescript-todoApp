import React,{useState} from 'react';
import InputField from './components/inputField';
import { Todo } from './components/model';
import Todolist from './components/todolist';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      // Empty the input
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add;
    let active = todos;
    let complete = completedTodos;
    
    if (source.droppableId === "TodoList") {
      add = active[source.index];
     // remove
      active.splice(source.index, 1);
    }
    else {
      add = complete[source.index];
      // remove
       complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    }
    else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  }
    
  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Todolist todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;

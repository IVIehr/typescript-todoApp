import React,{useState} from 'react';
import './App.css';
import InputFied from './components/inputField';

const App = () => {
  const [todo, setTodo] = useState<string>("");
  console.log("hi");
  console.log(todo);
  
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputFied todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;

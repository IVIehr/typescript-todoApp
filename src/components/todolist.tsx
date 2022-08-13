import React from 'react'
import { Todo } from './model';
import SingleTodo from './SingleTodo';

interface AppProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Todolist = ({todos, setTodos}: AppProps) => {
  return (
    <div className='container'>
      <div className="todos">
        <span className="todos_heading">Active Tasks</span>
        {todos.map((t) =>
        <SingleTodo todo={t} key={t.id} todos={todos} setTodos={setTodos} />
      )}
      </div>
      <div className="todos remove">Completed Tasks</div>
    </div>
  )
}

export default Todolist
import React from 'react'
import { Todo } from './model';
import SingleTodo from './SingleTodo';

interface AppProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Todolist = ({todos, setTodos}: AppProps) => {
  return (
    <div className='todos'>
      {todos.map((t) =>
        <SingleTodo todo={t} key={t.id} todos={todos} setTodos={setTodos} />
      )}
    </div>
  )
}

export default Todolist
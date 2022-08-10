import React from 'react'
import { GrCheckmark } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Todo } from './model';

type AppProps = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}: AppProps) => {

    const handleComplete = (id: number) => {
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(updateTodos);
    };
  return (
      <div>
          <form className={todo.isDone ? 'todos__single complete' : 'todos__single'}>
              <span className="todos__single--text">{todo.todo}</span>
              <span className="icon">
                <GrCheckmark onClick={() => handleComplete(todo.id)}/>    
              </span>
              <span className="icon">
                  <AiFillEdit /> 
              </span>
              <span className="icon">
                 <RiDeleteBin6Fill/>  
              </span>
          </form>
    </div>
  )
}

export default SingleTodo
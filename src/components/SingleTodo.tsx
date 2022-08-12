import React,{useEffect, useRef, useState} from 'react'
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
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleComplete = (id: number) => {
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            return todo;
        });
        setTodos(updateTodos);
    };

    const handleDelete = (id: number) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (
                todo.id === id ? { ...todo, todo: editTodo } : todo
            )));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    // Focus while editting 
    useEffect(() => {
        inputRef.current?.focus();
    },[edit]);

  return (
      <div>
          <form className={todo.isDone ? 'todos__single complete' : 'todos__single'} onSubmit={e => handleEdit(e, todo.id)}>
              {edit ? <input className='todos__single--text' ref={inputRef} value={editTodo} onChange={e => setEditTodo(e.target.value)} /> : <span className="todos__single--text">{todo.todo}</span>}
              <span className="icon">
                <GrCheckmark onClick={() => handleComplete(todo.id)}/>    
              </span>
              <span className="icon"
                  onClick={() => {
                      if (!edit && !todo.isDone) {
                          setEdit(!edit)
                      }
                 }}
                >
                  <AiFillEdit /> 
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                 <RiDeleteBin6Fill/>  
              </span>
          </form>
    </div>
  )
}

export default SingleTodo
import React,{useEffect, useReducer, useRef, useState} from 'react'
import { GrCheckmark } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Todo } from './model';
import { Draggable } from 'react-beautiful-dnd';


type AppProps = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

type Actions = {type:"ADD"; payload: string} | {type:"REMOVE"; payload: number} | {type:"DONE", payload: number}
const reducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
        // case "ADD":
        //     return[
        //         ...state,
        //         {id: Date.now, todo: action.payload , isDone: false}
        //     ];
            
        case "REMOVE":
            console.log(state.map((todo)=> todo.id === action.payload ? todo.todo : ""));
            
            return state.filter((todo) => todo.id !== action.payload);
        
        case "DONE":
            return state.map((todo) => {
            if (todo.id === action.payload) {
                return { ...todo, isDone: !todo.isDone };
            } else {
                return todo;
            }
            });
            default:
                return state;
    }
  };
  
  const SingleTodo = ({todo, todos, setTodos, index, completedTodos,setCompletedTodos}: AppProps) => {
    const [todoState, dispatch] = useReducer(reducer, [...todos]);
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

      const handleComplete = (id: number) => {
        let arr: Todo[] = [];
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone;
            }
            if (todo.isDone === true) {
                arr.push(todo);
            }
            // else {
            //     if (arr.includes(todo)) {
            //         arr.filter(t => t !== todo);
            //     }
            // }
            return todo;
        });
          
        //   let newTodos = [...arr].map((item, i) => Object.assign({}, item, completedTodos[i]));
        //   console.log(newTodos);
          
        // setCompletedTodos(newTodos);
        setTodos(updateTodos);
    };

    // const handleComplete = (id: number) => {
    //     dispatch({ type: "DONE", payload: id });
    //     console.log(todoState);
    //     let newTodos = [...todos].map((item, i) => Object.assign({}, item, todoState[i]));
    //     console.log(newTodos);
    //     setTodos(todoState);
    // };
    
    // const handleDelete = (id: number) => {
    //     dispatch({ type: "REMOVE", payload: id });
    //     console.log(todoState);
    //     let newTodos = [...todos].filter(todo => todo.id !== id)
    //     console.log(newTodos);
    //     setTodos(newTodos);
    // };

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
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
            <form
                className={todo.isDone ? 'todos__single complete' : 'todos__single'}
                onSubmit={e => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {edit ? (
                <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="todos__single--text"
                ref={inputRef}
                />
                ) : todo.isDone ? (
                    <s className="todos__single--text">{todo.todo}</s>
                ) : (
                    <span className="todos__single--text">{todo.todo}</span>
                  )}
                <div>
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
                </div>
            </form>
        )}
    </Draggable>
  )
}

export default SingleTodo
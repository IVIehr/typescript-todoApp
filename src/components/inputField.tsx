import React, { useRef } from "react";
import { useForm, SubmitHandler} from "react-hook-form";

interface AppProps{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: () => void
}
type Inputs = {
  todoText: string,
};

const InputField = ({todo, setTodo, handleAdd}: AppProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = () => {
        handleAdd();
        inputRef.current?.blur();
    };
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register("todoText",{ required: true });

  // console.log(watch("todoText")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="input" onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
          <input
              {...rest}
              className="input__box"
              placeholder="Enter a task"
              value={todo}
              ref={(e) => {
                ref(e)
                inputRef.current = e
              }}
              onChange={(e) => setTodo(e.target.value)}
          />
      {/* errors will return when field validation fails  */}
      {errors.todoText && <div className="error">This field is required</div>}
      
      <input className="input_submit" type="submit" value="GO"/>
    </form>
  );
}
export default InputField;
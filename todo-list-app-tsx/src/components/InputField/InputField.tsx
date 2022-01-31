import './style.css'
import { useRef } from "react"


// Create an interface for defining the types of data passed by parent component
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e:React.FormEvent)=>void //this function does not return anything, thus we stablish void as type. The Event has to be defined. One way is to defined it as FormElement
}


const InputField = ({ todo, setTodo, handleAdd }: Props) => {

  //Establish a reference and add type. In this case its an HTML input
const inputRef = useRef<HTMLInputElement>(null);


  return <form className='input' onSubmit={(e)=>{
    handleAdd(e);
    inputRef.current?.blur()}}//this method helps setting the focus back after a task has been input. It needs to be passed to the input element too
    > 
    <input placeholder='enter a task' className='input__box' ref={inputRef} value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
    <button className='input__submit' type='submit'>Add</button>

  </form>;
};

export default InputField
  ;

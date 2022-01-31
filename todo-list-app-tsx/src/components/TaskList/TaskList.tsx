import { Todo } from "../../task-model"
import TodoCard from "../TodoCard/TodoCard";
import "./style.css"

interface Props{
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
}


const TaskList:React.FC<Props> = ({todos, setTodos}) => {
  return (
  <div className="todos">
    {todos.map((todo)=><TodoCard todo={todo} todos={todos} setTodos={setTodos} key={todo.id}></TodoCard>)}

  </div>); 
};

export default TaskList;

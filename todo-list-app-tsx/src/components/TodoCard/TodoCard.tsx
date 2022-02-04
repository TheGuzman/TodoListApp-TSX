import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Todo } from '../../task-model';
import "./style.css"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdOutlineDownloadDone } from "react-icons/md"


interface Props {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const TodoCard: React.FC<Props> = ({ todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);



    const saveInLocalStorage = ():void => localStorage.setItem('tasks', JSON.stringify(todos))

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) =>
            //change the property isDone to the opposite value
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
            saveInLocalStorage()
    }

    const handleDelete = (id: number) => {
        // returns all the tasks that do not match the id passed and sets the todos to that array
        setTodos(todos.filter(todo => todo.id !== id))
        saveInLocalStorage()
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, todo: editTodo } : todo));
        setEdit(false)
        saveInLocalStorage()
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus()
    }, [edit]);
    

    return (
        <form className="todo__single--form" onSubmit={(e) => handleEdit(e, todo.id)}>
            {
                //edit equals true then a new input is rendered with the value of the task
                edit ? (
                    <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todo__task--text" />
                ) :
                    (/* If isDone is true then it renders a strikethrough tag  */
                        todo.isDone ?
                            <s className='todo__task--text'>{todo.todo}</s>
                            : <span className='todo__task--text'>{todo.todo}</span>
                    )
            }

            <div className='icons__container'>
                <span className="icon" onClick={() => {
                    // if edit mode is not true and the task is not done, then it can be edited
                    if (!edit && !todo.isDone) setEdit(!edit)
                }
                }>
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdOutlineDownloadDone />
                </span>
            </div>
        </form>
    );
};

export default TodoCard;

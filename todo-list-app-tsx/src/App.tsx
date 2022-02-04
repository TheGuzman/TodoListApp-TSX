
import React, { useState, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField/InputField';
import TaskList from './components/TaskList/TaskList';
import { Todo } from './task-model';

const App: React.FC = () => {

  const savedTasks= JSON.parse(localStorage.getItem('tasks')||'[]')
  console.log(savedTasks)
  console.log(savedTasks.length)

  useEffect(() => {
    if(savedTasks.length>0)setTodos(savedTasks)
    else{ localStorage.setItem('tasks', '[]')}
  },[]);
  

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]|[]>(savedTasks); //Define todos as an array of Todo interface
  
 
  
  // 
  //the event has to be defined too. Good practice is to define it as FormEvent
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //if there is a new task to be added, it is added to the existing tasks
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      //clear the inputbar
      setTodo('');
    }
  }
    localStorage.setItem('tasks', JSON.stringify(todos))
  
 

  return (
    <div className="App">
      <span className="heading">2DOs</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TaskList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

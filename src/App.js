import React, { useState } from "react";
import TodoList from "./TodoList";

export default function App() {
  // state = {
  //   todos: [
  //     { id: 1, title: "First todo", completed: false },
  //     { id: 2, title: "Second todo", completed: false },
  //   ],
  // // };

  const [todos, setTodos] = useState([
    { id: 1, title: "First todo", completed: false },
    { id: 2, title: "Second todo", completed: false },
  ],)

  const [todoValue, setTodoValue] = useState('')

  const updateTodoValue = (event) => {
    if (event.key === 'Enter') {
      setTodos([
        ...todos, {
          id: Date.now(),
          title: todoValue,
          completed: false
        }
      ])
      setTodoValue('')
    }
  }

  return (
    <div className="container">
      <h1>Todo app</h1>

      <div className="input-field">
        <input 
          type="text" 
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
          onKeyPress={updateTodoValue}
        />
        <label>Todo name</label>
      </div>

      <TodoList todos={todos} />
    </div>
  );
}

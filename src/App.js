import React, { useEffect, useState } from "react";
import { Context } from "./context";
import TodoList from "./TodoList";

export default function App() {
  // state = {
  //   todos: [
  //     { id: 1, title: "First todo", completed: false },
  //     { id: 2, title: "Second todo", completed: false },
  //   ],
  // // };

  const [todos, setTodos] = useState([]);

  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("todos") || [];
    setTodos(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodoValue = (event) => {
    if (event.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoValue,
          completed: false,
        },
      ]);
      setTodoValue("");
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  return (
    <Context.Provider value={{toggleTodo, removeTodo}}>
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
    </Context.Provider>
  );
}

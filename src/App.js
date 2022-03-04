import React, { useEffect, useReducer, useState } from "react";
import { Context } from "./context";
import reducer from "./reducer";
import TodoList from "./TodoList";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );

  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const updateTodoValue = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: 'add',
        payload: todoValue
      })
      setTodoValue("");
    }
  };

  // const removeTodo = (id) => {
  //   setTodos(todos.filter(todo => {
  //     return todo.id !== id
  //   }))
  // }

  // const toggleTodo = (id) => {
  //   setTodos(todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed
  //     }
  //     return todo
  //   }))
  // }

  return (
    <Context.Provider
      value={
        {
          dispatch
        }
      }
    >
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

        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}

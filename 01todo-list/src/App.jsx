import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newtask, setNewtask] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newtask,
          completed: false,
        },
      ];
    });

    setNewtask("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id != id);
    });
  }

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your task"
          value={newtask}
          onChange={(e) => setNewtask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <ul>
          {todos.length == 0 && "No Task"}
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                <label htmlFor="">{todo.title}</label>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;

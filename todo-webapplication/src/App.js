import "./index.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import TodoList from "./components/TodoList.js";

import { useState } from "react";

function App() {
  // Lagre alle todos her i parent for å kunne brukes i andre komponenter
  const [todos, setTodos] = useState([]);

  // Funksjon for å fjerne todos
  const removeTodo = (id) => {
    const oldTodos = [...todos];
    setTodos(oldTodos.filter((todos) => todos.id !== id));
  };
  return (
    <div className="App">
      <Navbar />

      <main>
        <Form setTodos={setTodos} />
        <TodoList todos={todos} removeTodo={removeTodo} />
      </main>
    </div>
  );
}

export default App;

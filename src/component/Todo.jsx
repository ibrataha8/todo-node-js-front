import { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/getTodo");
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodo();
  }, [todos]);
  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const response = await axios.post("http://127.0.0.1:3000/creteTodo", {
        data: { title: newTodo },
      });
      console.log(response);
    }
  };
  const UpdateTodo = async () => {};
  const handleDeleteTodo = async () => {};

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      <div className="flex">
        <TextInput
          className="flex-grow mr-2"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add Todo"
        />
        <Button gradientMonochrome="cyan" onClick={handleAddTodo}>
          Add
        </Button>
      </div>
      <ul className="mt-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between mb-2 bg-green-400 p-3 rounded-lg text-white"
          >
            <span>{todo.title}</span>
            <div className="space-x-2">
              <button
                className="text-sm text-blue-800 hover:text-blue-900"
                onClick={() => UpdateTodo(todo.id)}
              >
                Edit
              </button>
              <button
                className="text-sm text-red-600 hover:text-red-700"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

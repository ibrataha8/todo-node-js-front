import { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
import ModalDel from "./ModalDele";
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [updateTodoName, setUpdateTodoName] = useState("Add");
  const [newTodo, setNewTodo] = useState("");
  const [idUpdate, setIdUpdate] = useState(null);
  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/getTodo");
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      const response = await axios.post("http://127.0.0.1:3000/creteTodo", {
        title: newTodo,
      });
      await fetchTodo();
      console.log(response);
    }
  };
  const UpdateTodo = (id, title) => {
    setNewTodo(title);
    setUpdateTodoName("Save");
    setIdUpdate(id);
  };
  const UpdateTodoVrai = async () => {
    const response = await axios.put(
      "http://127.0.0.1:3000/updateTodo/" + idUpdate,
      {
        newTitle: newTodo,
      }
    );
    setTodos(response.data);
    setUpdateTodoName("Add");
  };
  const allTodo = () => {

  };
  const todoComleted = () => {
    
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl text-center font-semibold mb-4">Todo List</h1>
      <div className="flex">
        <TextInput
          className="flex-grow mr-2"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add Todo"
        />
        <Button
          gradientMonochrome="cyan"
          onClick={updateTodoName == "Add" ? handleAddTodo : UpdateTodoVrai}
        >
          {updateTodoName}
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
                onClick={() => UpdateTodo(todo.id, todo.title)}
              >
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-700">
                <ModalDel onDelete={fetchTodo} id={todo.id} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        {/* Number Todo */}
        <div className="text-base font-serif">{todos.length} Todo</div>
        {/* All Todo */}
        <div className="bg-red-400">
          <button onClick={() => allTodo()}>All Todo</button>
        </div>
        <div className="bg-blue-400">
          <button onClick={() => todoComleted()}>Completed</button>
        </div>
      </div>
    </div>
  );
}

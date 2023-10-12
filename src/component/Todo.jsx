import { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import { Badge } from "flowbite-react";
import axios from "axios";
import ModalDel from "./ModalDele";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [updateTodoName, setUpdateTodoName] = useState("Add");
  const [newTodo, setNewTodo] = useState("");
  const [idUpdate, setIdUpdate] = useState(null);
  const [activeButton, setActiveButton] = useState("All");
  const handleButtonClick = nameTodo => {
    setActiveButton(nameTodo);
  };
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
      setNewTodo("");

      // console.log(response);
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
    console.log(response.data);
    setTodos(response.data);
    setUpdateTodoName("Add");
  };

  const completedTodo = async id => {
    const response = await axios.post(
      "http://127.0.0.1:3000/updateTodoCmptd/" + id
    );
    fetchTodo();
  };
  const todoComleted = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/getTodoCompleted"
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const todoNotComleted = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/getTodoNotCompleted"
      );
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="flex justify-end m-2">
        <button
          onClick={logOut}
          type="button"
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Log Out
        </button>
      </div>
      <div className="max-w-md mx-auto mt-8 p-4">
        <h2 className="text-2xl text-center font-semibold mb-4">Todo List</h2>
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
              className="flex items-center justify-between mb-2 bg-yellow-400 p-3 rounded-lg text-white"
            >
              <span>{todo.title}</span>
              <div className="space-x-2">
                <button
                  className="text-sm bg-slate-300 hover:bg-slate-700 rounded-3xl p-1 text-blue-800 hover:text-white"
                  onClick={() => UpdateTodo(todo.id, todo.title)}
                >
                  <EditIcon />
                </button>
                <button
                  className="text-sm bg-slate-300 hover:bg-slate-700 rounded-3xl p-1 text-green-500 "
                  onClick={() => completedTodo(todo.id)}
                >
                  {todo.completed ? <DoneAllIcon /> : <DoneOutlineIcon />}
                </button>
                <button className="text-sm bg-slate-300 hover:bg-slate-700 rounded-3xl p-1 text-red-600 ">
                  <ModalDel onDelete={fetchTodo} id={todo.id} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          {/* Number Todo */}
          <div className="flex items-center text-base font-serif">
            <Badge className="p-3 rounded-3xl text-sm" color="info">
              {todos.length} Todo
            </Badge>
          </div>
          {/* All Todo */}
          <div>
            <Button
              onClick={() => {
                fetchTodo();
                handleButtonClick("All");
              }}
              color={activeButton === "All" ? "success" : "blue"}
              pill
            >
              {" "}
              <p>All Todo</p>
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                todoComleted();
                handleButtonClick("Completed");
              }}
              color={activeButton === "Completed" ? "success" : "blue"}
              pill
            >
              {" "}
              <p>Completed</p>
            </Button>
          </div>

          <div>
            <Button
              onClick={() => {
                todoNotComleted();
                handleButtonClick("NotCompleted");
              }}
              color={activeButton === "NotCompleted" ? "success" : "blue"}
              pill
            >
              {" "}
              <p>Not Completed</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

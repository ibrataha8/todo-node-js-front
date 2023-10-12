import Todo from "./component/Todo";
import Login from "./component/auth/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="">
      <Routes>
        {token ? (
          <Route path="/todos" element={<Todo />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {/* <Route path="/login" element={<Login />} />
         <Route path="/todos" element={<Todo />} /> */}
      </Routes>
    </div>
  );
}

export default App;

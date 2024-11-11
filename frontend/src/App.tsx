import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App;

import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Signup from "./pages/register/Signup";
import { useState } from "react";
import ErrorModal from "./components/modal/ErrorModal";

function App() {

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className='app'>
      <Routes>
        <Route path="/login" element={<Login setModal={setModal}/>}/>
        <Route path="/register" element={<Signup/>}/>
      </Routes>
      {modal && <ErrorModal text="text" setModal={setModal}/>}
    </div>
  )
}

export default App;

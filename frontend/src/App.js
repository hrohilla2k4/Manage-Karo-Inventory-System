import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

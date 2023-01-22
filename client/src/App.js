import Home from "./pages/booking/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  const [userData, setUserData] = useState({});

  function handleLogin(data) {
    setUserData(data);
    console.log(data);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home userData={userData} ></Home>} />
        <Route path='/register' element={<Register ></Register>} />
        <Route path='/login' element={<Login onLogin={handleLogin}></Login>} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AuthProvider';


function App() {
  const authstatus = useState('guest');
  const userNameVar = useState('');
  const userRealNameVar = useState('');

  return (
    <AuthProvider.Provider value={{authstatus, userNameVar, userRealNameVar}}>
     <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<RegisterUser />} />
      </Routes>
    </AuthProvider.Provider>
  );
}

export default App;

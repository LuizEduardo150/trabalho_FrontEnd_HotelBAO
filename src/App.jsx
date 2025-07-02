import { useState } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AuthProvider';
import AdminMenu from './pages/AdminMenu'
import ManageRooms from './pages/ManageRooms'
import ManageUser from './pages/ManageUser'
import CustonHeader from './components/CustomHeader';
import PersonalData from './pages/PersonalData';
import UserTransactions from './pages/UserTransactions';
import PrivateRoute from './PrivateRoute';
import PrivateRouteADM from './PrivateRouteADM';


function App() {
  return (
    <AuthProvider>
      <CustonHeader />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        
        <Route path='/Register' element={<RegisterUser />} />
        
        <Route path='/transactions' element={<PrivateRoute><UserTransactions /> </PrivateRoute>} />
        
        <Route path='/personaldata' element={<PrivateRoute><PersonalData /></PrivateRoute>} />
       
        <Route path='/admin' element={<PrivateRouteADM><AdminMenu /></PrivateRouteADM>} />
       
        <Route path='/admin/rooms' element={<PrivateRouteADM> <ManageRooms /> </PrivateRouteADM>} />
       
        <Route path='/admin/ManageUser' element={<PrivateRouteADM>  <ManageUser /> </PrivateRouteADM>} />

        <Route path='/admin/RegisterUser' element={<PrivateRouteADM> <RegisterUser /> </PrivateRouteADM>} />
      
      </Routes>
    </AuthProvider>
  );
}

export default App;

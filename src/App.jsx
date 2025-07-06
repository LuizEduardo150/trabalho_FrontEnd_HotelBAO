import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import { AuthProvider } from './AuthProvider';
import AdminMenu from './pages/AdminMenu'
import ManageRooms from './pages/ManageRooms'
import ManageUser from './pages/ManageUser'
import PersonalData from './pages/PersonalData';
import UserTransactions from './pages/UserTransactions';
import PrivateRoute from './PrivateRoute';
import PrivateRouteADM from './PrivateRouteADM';
import RoomPage from './pages/RoomPage';
import CustonHeader from './components/CustomHeader';
import UserDataChange from './pages/UserDataChange';


function App() {
  return (
    <AuthProvider>
      <CustonHeader />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        
        <Route path='/Register' element={<RegisterUser />} />

        <Route path='/room/:id' element={< RoomPage/>} />
        
        <Route path='/transactions' element={<PrivateRoute><UserTransactions /> </PrivateRoute>} />
        
        <Route path='/personaldata' element={<PrivateRoute><PersonalData /></PrivateRoute>} />
       
        <Route path='/admin' element={<PrivateRouteADM><AdminMenu /></PrivateRouteADM>} />
       
        <Route path='/rooms' element={<PrivateRouteADM> <ManageRooms /> </PrivateRouteADM>} />
       
        <Route path='/ManageUser' element={<PrivateRouteADM>  <ManageUser /> </PrivateRouteADM>} />

        <Route path='/RegisterUser' element={<PrivateRouteADM> <RegisterUser /> </PrivateRouteADM>} />

        <Route path='/editUserData/:obj' element={<PrivateRouteADM> <UserDataChange /> </PrivateRouteADM>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;

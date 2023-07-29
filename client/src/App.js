//import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
//import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import Dashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Orders from './pages/User/Orders';
import ForgotPassword from './pages/Auth/ForgetPassword';
import Profile from './pages/User/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        { <Route path="user" element={<Dashboard />} />}
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />    
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />}/>
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        
        
      </Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='*' element={<Pagenotfound/>} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>
    </>
  );
}

export default App;

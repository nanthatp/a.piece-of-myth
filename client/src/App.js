//import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import Dashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        { <Route path="user" element={<Dashboard />} />
        }
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        
        
      </Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='*' element={<Pagenotfound/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;

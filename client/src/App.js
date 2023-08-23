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
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Orders from './pages/User/Orders';
import ForgotPassword from './pages/Auth/ForgetPassword';
import Profile from './pages/User/Profile';
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Banners from "./pages/Admin/Banners";
import ShowAllProduct from "./pages/ShowAllProduct";
import AdminOrders from "./pages/Admin/AdminOrders";
import ResetPassword from './pages/Auth/ResetPassword';
import CreateBanner from './pages/Admin/CreateBanner';
import UpdateBanner from './pages/Admin/UpdateBanner';
import CreatePreProduct from './pages/Admin/CreatePreProduct';
import CreateArtist from './pages/Admin/CreateArtist';
import Artists from "./pages/Admin/Artists";
import Preproducts  from "./pages/Admin/Preproducts";
import UpdatePreProduct from './pages/Admin/UpdatePreProduct';
import UpdatePassword from './pages/User/UpdatePassword';
import PreorderCartPage from './pages/PreorderCartPage';
import ShowAllPre from './pages/ShowAllPre';
import Preorder from './pages/User/Preorder';
import AdminPreorder from './pages/Admin/AdminPreorder';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/preproduct/:slug" element={<PreorderCartPage />} />     
      <Route path="/categories" element={<Categories />} />
      <Route path="/ShowAllProduct" element={<ShowAllProduct />} />
      <Route path="/ShowAllPre" element={<ShowAllPre />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        { <Route path="user" element={<Dashboard />} />}
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/preorders" element={<Preorder />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/update-password" element={<UpdatePassword />} />    
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />}/>
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/create-banner" element={<CreateBanner/>} />
        <Route path="admin/create-artist" element={<CreateArtist/>} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/preproduct/:slug" element={<UpdatePreProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/banners" element={<Banners />} />
        <Route path="admin/artists" element={<Artists />} />
        <Route path="admin/banner/:slug" element={<UpdateBanner />} />
        <Route path="admin/create-preproduct" element={<CreatePreProduct />} />
        <Route path="admin/preproduct" element={<Preproducts />} />
        <Route path="admin/preorder" element={<AdminPreorder />} />
        
        
      </Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='*' element={<Pagenotfound/>} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path="/user/reset/:id/:token" element={<ResetPassword />} />
    </Routes>
    </>
  );
}

export default App;

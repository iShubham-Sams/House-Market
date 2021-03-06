import './App.css';
import HomePage from './pages/HomePage';
import Offers from './pages/Offers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Proflie from './pages/Proflie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';
import Privaterout from './components/layout/Privaterout';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';

function App() {
  return (
<>
<Router>
<ToastContainer/>
<Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/offers' element={<Offers/>}/>
<Route path='/category/:categoryName' element={<Category/>}/>
<Route path='/editlisting/:listingId' element={<EditListing/>}/>
<Route path='/signin' element={<Signin/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/contact/:landlordId' element={<Contact/>}/>
<Route path='/forgot-password' element={<ForgotPassword/>}/>
<Route path='/create-listing' element={<CreateListing/>}/>
<Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
<Route path='/profile' element={<Privaterout/>}>
<Route path='/profile' element={<Proflie/>}/>
</Route>
<Route path='/offers' element={<Offers/>}/>
</Routes>
</Router>
</>
  );
}

export default App;

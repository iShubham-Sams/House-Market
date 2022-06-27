import './App.css';
import HomePage from './pages/HomePage';
import Offers from './pages/Offers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';

function App() {
  return (
<>
<Router>
<Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/offers' element={<Offers/>}/>
<Route path='/signin' element={<Signin/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/profile' element={<Signin/>}/>
<Route path='/offers' element={<Offers/>}/>
</Routes>
</Router>
</>
  );
}

export default App;

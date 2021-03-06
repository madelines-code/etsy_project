import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import { Route, Routes} from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AuthProvider from './providers/AuthProvider';
import ProductsBySeller from './Pages/ProductsBySeller';
import ProductsByCategory from './Pages/ProductsByCategory';
import SearchProducts from './Pages/SearchProducts';

function App() {
  return (
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element= {<Home/>}/>
          <Route path="/shops" element= {<ProductsBySeller/>}/>
          <Route path="/categories" element= {<ProductsByCategory/>}/>
          <Route path="/search" element= {<SearchProducts/>}/>
          <Route path="/login" element= {<Login/>}/>
          <Route path="/register" element= {<Register/>}/>
          <Route element={<RequireAuth />}>
              {/* protected routes go here */}
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Route >
      </Routes>
  );
}

export default App;

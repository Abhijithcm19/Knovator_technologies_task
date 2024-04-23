import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Nav  from "./components/Nav";
import Store from './pages/Store';
import CartItems from './pages/CartItems';

function App() {

  return (
    <div className='App'>
      <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/cart" element={<CartItems />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;

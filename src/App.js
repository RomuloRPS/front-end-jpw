import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Computadores from './components/Computadores'
import Pessoas from './components/Pessoas'
import Carros from './components/Carros'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about">
            {"Página não existe"}
        </Route>

        <Route exact path='/' element={<Computadores/>}>
        </Route>

        <Route exact path='/computador' element={<Computadores/>}>
        </Route>

        <Route exact path='/pessoa' element={<Pessoas/>}>
        </Route>

        <Route exact path='/carro' element={<Carros/>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;

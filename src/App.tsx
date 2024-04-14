import { Route } from 'wouter'
import './App.css'
import Home from './pages/Home/Home'
import {ExpressionContextProvider} from './context/ExpressionContext'
import FalsaPosicion from './pages/FalsaPosicion/FalsaPosicion'
import Biseccion from './pages/Biseccion/Biseccion'
import Secante from './pages/Secante/Secante'
import Newton from './pages/Newton/Newton'

function App() {

  return (
    <ExpressionContextProvider>
      <Route component={Home} path='/' />
      <Route component={FalsaPosicion} path='/falsa-posicion'/>
      <Route component={Biseccion} path='/biseccion' />
      <Route component={Secante} path='/secante' />
      <Route component={Newton} path='/newton' />
    </ExpressionContextProvider>
  )
}

export default App

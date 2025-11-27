import './App.css'
import { lazy, Suspense } from 'react'
import MainPage from './pages/MainPage'
import PokemonInfo from './pages/PokemonInfo'
const PokeInventory = lazy (() => import('./pages/PokemonList') )
const Login = lazy( () => import('./pages/Login') );
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
    <Suspense>

    <BrowserRouter>
      <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='/pokemon/inventory' element={<PokeInventory/>}></Route>
          <Route path='/pokemon/info/:name' element={<PokemonInfo/>}></Route>
          <Route path="/login" element= {<Login/>}></Route>
      </Routes>
    </BrowserRouter>

    </Suspense>

      
    </>
  )
}

export default App

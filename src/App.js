import './css/app.css'
import { Landing } from './page/Landing';
import { Main } from './page/main';
import { Graph } from './page/graph';
import { Asset } from './page/asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSquarePollVertical, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  let navigate = useNavigate()

  useEffect(()=>{
    let a =setTimeout(() => {
      navigate('/main')
    }, 3000);
    return()=>{clearTimeout(a)}
  },[])

  return (
    <div className='app'>

      {/* page */}
      <Routes basename = {process.env.PUBLIC_URL}>
        <Route path='/hostHousehold/' element={<Landing/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/graph' element={<Graph/>}/>
        <Route path='/asset' element={<Asset/>}/>
      </Routes>

      {/* navbar */}
      <div className='under-navbar'>
        <div className='row'>
          <div className='col-4'>
            <FontAwesomeIcon icon={faBook} onClick={()=>{
              navigate('/main')
            }}/>
          </div>
          <div className='col-4'>
            <FontAwesomeIcon icon={faSquarePollVertical} onClick={()=>{
              navigate('/graph')
            }}/>
          </div>
          <div className='col-4'>
            <FontAwesomeIcon icon={faWallet} onClick={()=>{
              navigate('/asset')
            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const [adminKey,setAdminKey] = useState(() => sessionStorage.getItem('adminKey') || '')
  const [entry,setEntry] = useState('')
  if (!adminKey) return <main style={{maxWidth:420,margin:'12vh auto',padding:24,fontFamily:'Arial'}}><h2>Food Delivery Admin</h2><form onSubmit={(event)=>{event.preventDefault();sessionStorage.setItem('adminKey',entry);setAdminKey(entry)}}><label htmlFor='admin-key'>Admin access key</label><input id='admin-key' type='password' value={entry} onChange={(event)=>setEntry(event.target.value)} required style={{display:'block',width:'100%',padding:12,margin:'12px 0'}}/><button type='submit'>Continue</button></form></main>
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <button onClick={()=>{sessionStorage.removeItem('adminKey');setAdminKey('')}} style={{margin:'8px 20px'}}>Lock admin</button>
      <hr/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Add url={url} adminKey={adminKey}/>}/>
          <Route path='/add' element={<Add url={url} adminKey={adminKey}/>}/>
          <Route path='/list' element={<List url={url} adminKey={adminKey}/>}/>
          <Route path='/orders' element={<Orders url={url} adminKey={adminKey}/>}/>
        </Routes>
      </div>
    </div>
  )
}
export default App
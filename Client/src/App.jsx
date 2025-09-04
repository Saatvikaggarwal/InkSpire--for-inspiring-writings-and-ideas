import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Adminportal from './pages/Adminportal'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import Navbar from './components/Navbar'
import { useFetchUserQuery } from './services/api'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import ShowPost from './pages/ShowPost'



const App = () => {
  const {data,isLoading,isError}=useFetchUserQuery();
   
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        
        <Route element={<PublicRoute/>}>
        
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Route>

        <Route element={<PrivateRoute/>}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Adminportal />} />
          <Route path="/admin/new" element={<NewPost />} />
          <Route path="/admin/edit/:id" element={<EditPost />} />
          <Route path='/dashboard/show/:id' element={<ShowPost/>}/>

        </Route>
        
      </Routes>
    </div>
  )
}

export default App
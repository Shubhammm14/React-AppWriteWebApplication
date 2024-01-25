
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [loading ,setLoading]=useState(true);
  const dispatch=useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        // Handle error if needed
      })
      .finally(() => setLoading(false));
  }, []);
  

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
       <Header/>
       <main>
        <outlet/>
        {/**outlet */}
       </main>
       <Footer/>

      </div>
    <h1>infommm</h1>
      </div>
  ):null
}

export default App

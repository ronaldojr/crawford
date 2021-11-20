import React, {useState, createContext, useEffect} from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import {BrowserRouter} from 'react-router-dom';
import PagesRoutes from '../../PagesRoutes';

export const AppContext = createContext(false)

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const value = {loggedIn, setLoggedIn}

  useEffect( function() {
    let isLoggedIn = localStorage.getItem("loggedIn")
    if (isLoggedIn === 'true') setLoggedIn(true)
    else setLoggedIn(false)
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
          <AppContext.Provider value={value}>
            <ReactNotification />
            <Header />
            <PagesRoutes />
            <Footer />
          </AppContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
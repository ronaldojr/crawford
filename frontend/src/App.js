import React, {useState, createContext} from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {BrowserRouter} from 'react-router-dom';
import PagesRoutes from './PagesRoutes';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const value = {loggedIn, setLoggedIn}
  const AppContext = createContext()

  return (
    <div className="App">
        <BrowserRouter>
          <AppContext.Provider value={value}>
            <Header />
            <PagesRoutes />
            <Footer />
          </AppContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;

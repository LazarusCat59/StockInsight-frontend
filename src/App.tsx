import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Home, Mainpage, Login, Footer, Request, Logout, Audit, 
	AddUser, Profile, Locations, NewAudit, Header, Stockaud, Auditsystem,
	Addstock, StocksAtLocation, StockView } from './components/Imports';
import logo from './logo.svg';
import './App.css';
<source />

export interface LoginDetails {
	loginToken: string;
	setLoginToken: (logintoken: string) => void;
}

interface WindowLocation {
	location: string;
}

export const authContext = createContext<LoginDetails | null>(null);

function App() {
  const [loginToken, setLoginToken] = useState(
    () => JSON.parse(localStorage.getItem('login_token')!)
  );

  useEffect(() => {
    localStorage.setItem('login_token', JSON.stringify(loginToken));
  }, [loginToken])

  return (
    <div className="App ">
      <BrowserRouter>
        <authContext.Provider value={{loginToken, setLoginToken}}>
          <RoutesLocation/>
          <Footer/>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}

function RoutesLocation() {
  const location = useLocation();
  const isVisible = !(location.pathname === '/login');

	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

  return (
    <>
      { isVisible && <Header/> }
      <Routes>
        <Route path ='/' element={ loginToken ? <Home/> : <Mainpage/>} />
        <Route path ='/request' element={ loginToken ? <Request/> : <Navigate to='/login'/>} />
				<Route path ='/login' element={ loginToken ? <Navigate to='/'/> : <Login/>}/>
				<Route path ='/logout' element={ loginToken ? <Logout/> : <Navigate to='/'/>} />
				<Route path ='/audit' element={<Audit/>} />
				<Route path ='/adduser' element={<AddUser/>} />
				<Route path ='/profile' element={<Profile/>} />
				<Route path='/head' element={<Header/>} />
				<Route path="/mainpage" element={<Mainpage/>}/>
				<Route path="/locations" element={<Locations/>}/>
				<Route path="/locations/:locationId" element={<StocksAtLocation/>}/>
				<Route path="/stocks/:stockId" element={<StockView/>}/>
				<Route path="/audit/:stockId" element={<NewAudit/>}/>
				<Route path="/newaudit" element={<NewAudit />} />
				<Route path ='/Stockaud' element={<Stockaud/>} />
				<Route path ='/Auditsystem' element={<Auditsystem/>} />
				<Route path ='/Addstock' element={<Addstock/>} />
      </Routes>
    </>
  );
}

export default App;

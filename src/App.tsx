import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Home, Mainpage, Login, Footer, Request, Logout, AuditPage,
	AddUser, Profile, Locations, NewAudit, Header, Stockaud, Auditsystem,
	Addstock, StocksAtLocation, StockView, Reportsto, Auditselect } from './components/Imports';
import logo from './logo.svg';
import './App.css';
import { getCurrentUser } from './apicalls';
import { LoginDetails } from './types';
<source />


export const authContext = createContext<LoginDetails | null>(null);

function App() {
  const [loginToken, setLoginToken] = useState(
    () => JSON.parse(localStorage.getItem('login_token')!)
  );

  const [userRole, setUserRole] = useState(
    () => JSON.parse(localStorage.getItem('user_role')!)
  );

  useEffect(() => {
    localStorage.setItem('login_token', JSON.stringify(loginToken));
  }, [loginToken])

  useEffect(() => {
    localStorage.setItem('user_role', JSON.stringify(userRole));
  }, [userRole])

  return (
    <div className="App bg-custom-light-gray  h-full">
      <BrowserRouter>
        <authContext.Provider value={{loginToken, setLoginToken, userRole, setUserRole}}>
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

	const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;

  return (
    <>
      { isVisible && <Header/> }
      <Routes>
        <Route path='/' element={ loginToken ? <Home/> : <Mainpage/>} />
        <Route path='/request' element={ loginToken ? <Request/> : <Navigate to='/login'/>} />
				<Route path='/login' element={ loginToken ? <Navigate to='/locations'/> : <Login/>}/>
				<Route path='/logout' element={ loginToken ? <Logout/> : <Navigate to='/'/>} />
				<Route path='/audit' element={ loginToken ? <AuditPage/> : <Navigate to='/login'/>} />
				<Route path='/adduser' element={ loginToken && userRole === 'HOD' ? <AddUser/> : <Navigate to='/login'/>} />
				<Route path='/profile' element={ loginToken ? <Profile/>: <Navigate to='/login'/>} />
				<Route path='/head' element={ loginToken ? <Header/>: <Navigate to='/login'/>} />
				<Route path="/mainpage" element={ loginToken ? <Mainpage/>: <Navigate to='/login'/>}/>
				<Route path="/locations" element={ loginToken ? <Locations/>: <Navigate to='/login'/>}/>
				<Route path="/locations/:locationId" element={ loginToken ? <StocksAtLocation/>: <Navigate to='/login'/>}/>
				<Route path="/stocks/:stockId" element={ loginToken ? <StockView/>: <Navigate to='/login'/>}/>
				<Route path="/audit/:stockId" element={ (loginToken && (userRole === 'ADT' || userRole === 'HOD' )) ? <NewAudit/>: <Navigate to='/login'/>}/>
				<Route path='/stockaud' element={ loginToken ? <Stockaud/>: <Navigate to='/login'/>} />
				<Route path='/auditsystem' element={ loginToken ? <Auditsystem/>: <Navigate to='/login'/>} />
				<Route path='/addstock' element={ loginToken ? <Addstock/>: <Navigate to='/login'/>} />
				<Route path='/auditselect' element={ loginToken ? <Auditselect/>: <Navigate to='/login'/>} />
				<Route path='/reports/:stockId' element={ loginToken ? <Reportsto/>: <Navigate to='/login'/>} />
      </Routes>
    </>
  );
}

export default App;

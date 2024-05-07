import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import { Sidebar, Home, Mainpage, Login, Footer, Request, Logout, AuditPage,
	AddUser, Profile, Locations, NewAudit, Header, Stockaud, Auditsystem,
	Addstock, StocksAtLocation, StockView,Reportsto} from './components/Imports';
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

	const [ userRole, setUserRole ] = useState("");
	const { loginToken, setLoginToken } = useContext(authContext) as LoginDetails;

	useEffect(() => {
		getCurrentUser(loginToken).then(user => {
			if(typeof user !== 'undefined') {
				setUserRole(user.role);
			}});
	}, [])

  return (
    <>
      { isVisible && <Header/> }
      <Routes>
        <Route path='/' element={ loginToken ? <Home/> : <Mainpage/>} />
        <Route path='/request' element={ loginToken ? <Request/> : <Navigate to='/login'/>} />
				<Route path='/login' element={ loginToken ? <Navigate to='/locations'/> : <Login/>}/>
				<Route path='/logout' element={ loginToken ? <Logout/> : <Navigate to='/'/>} />
				<Route path='/audit' element={<AuditPage/>} />
				<Route path='/adduser' element={<AddUser/>} />
				<Route path='/profile' element={<Profile/>} />
				<Route path='/head' element={<Header/>} />
				<Route path="/mainpage" element={<Mainpage/>}/>
				<Route path="/locations" element={<Locations/>}/>
				<Route path="/locations/:locationId" element={<StocksAtLocation/>}/>
				<Route path="/stocks/:stockId" element={<StockView/>}/>
				<Route path="/audit/:stockId" element={<NewAudit/>}/>
				<Route path="/newaudit" element={<NewAudit />} />
				<Route path='/stockaud' element={<Stockaud/>} />
				<Route path='/auditsystem' element={<Auditsystem/>} />
				<Route path='/addstock' element={<Addstock/>} />
				<Route path='/reportsto' element={<Reportsto/>} />
      </Routes>
    </>
  );
}

export default App;

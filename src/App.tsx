import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Sidebar, Home, Mainpage, Login,Footer,Request} from './components/Imports';
import logo from './logo.svg';
import './App.css';
import { Pageheader } from './components/Pageheader';
import { getLoginToken, getStockList } from './apicalls';
<source />

export interface LoginDetails {
	loginToken: string;
	setLoginToken: (logintoken: string) => void;
}

export const authContext = createContext<LoginDetails | null>(null);

function App() {
	const [loginToken, setLoginToken] = useState(
	() => JSON.parse(localStorage.getItem('login_token')!)
	);

	useEffect(() => {
		localStorage.setItem('login_token', JSON.stringify(loginToken));
	}, [loginToken])

	function RequestWithNavbar() {
		return (
		  <div>
			<Sidebar />
			<Request />
		  </div>
		);
	  }

	return (
			<div className="App ">
			<BrowserRouter>
			<authContext.Provider value={{loginToken, setLoginToken}}>
			<Routes>
			<Route path ='/' element={ loginToken ? <Mainpage/> : <Navigate to='/login'/>} />
			<Route path ='/request' element={ loginToken ? <Request/> : <Navigate to='/login'/>} />
			<Route path ='/login' element={ loginToken ? <Navigate to='/'/> : <Login/>}/>
			</Routes>
			<Footer />
			</authContext.Provider>
			</BrowserRouter>


			</div>


			);
}



export default App;

